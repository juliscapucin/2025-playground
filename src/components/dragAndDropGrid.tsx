'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';

type Position = {
    row: number;
    col: number;
    x: number;
    y: number;
    width: number;
    height: number;
};

type CardInstance = {
    position: Position;
    element: HTMLElement;
    index: number;
    dragger: Draggable | null;
    updatePosition: (index: number) => void;
};

type CardData = {
    id: string;
    title: string;
    content: string;
};

type DragAndDropGridProps = {
    cardsData: CardData[];
    columns?: number;
    rowHeight?: number;
};

// === Utils === //

// Build positions dynamically from container size
function buildGridPositions(
    container: HTMLElement | null,
    columns: number,
    rows: number,
    rowHeight: number
): Position[] {
    if (!container) return [];

    const rect = container.getBoundingClientRect();
    const colSize = rect.width / columns;

    const positions: Position[] = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            positions.push({
                row,
                col,
                x: col * colSize,
                y: row * rowHeight,
                width: colSize,
                height: rowHeight,
            });
        }
    }
    return positions;
}

// Animate to new position
function animateToNewPosition(
    card: CardInstance,
    newCardsCollection: CardData[],
    setCardsCollection: React.Dispatch<React.SetStateAction<CardData[]>>,
    isEndDrag = false
) {
    gsap.to(card.element, {
        duration: 0.3,
        x: card.position.x,
        y: card.position.y,
        width: card.position.width,
        height: card.position.height,
        onComplete: () => {
            if (isEndDrag) setCardsCollection(newCardsCollection);
        },
    });
}

// Handle reordering logic
function handleReorder(
    cardInstances: CardInstance[],
    item: CardInstance,
    newIndex: number
) {
    // Reposition dom elements
    cardInstances.splice(newIndex, 0, cardInstances.splice(item.index, 1)[0]);

    cardInstances.forEach((card, index) => {
        // Update each card's position
        card.updatePosition(index);
    });
}

export default function DragAndDropGrid({
    cardsData,
    columns = 6,
    rowHeight = 300,
}: DragAndDropGridProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rows = Math.ceil(cardsData.length / columns); // total rows based on items / columns
    const positions = useRef<Position[]>([]); // store positions
    const cardInstances = useRef<CardInstance[]>([]); // store Card instances
    const [cardsCollection, setCardsCollection] = useState(cardsData);

    // Build positions grid
    useEffect(() => {
        positions.current = buildGridPositions(
            containerRef.current,
            columns,
            rows,
            rowHeight
        );
    }, []);

    // Initialize Draggable + positioning + animations
    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Create a Card instance for positioning + GSAP animations + Draggable
        function createCard(element: HTMLElement, index: number): CardInstance {
            const card: CardInstance = {
                position: positions.current[index],
                element,
                index,
                dragger: null,
                updatePosition: (newIndex) => {
                    // Create a copy of the current state
                    const cardsCollectionCopy = [...cardsCollection];

                    // Reorder the copied array
                    cardsCollectionCopy.splice(
                        newIndex,
                        0,
                        cardsCollectionCopy.splice(card.index, 1)[0]
                    );

                    // Update card's index and position
                    card.index = newIndex;
                    card.position = positions.current[newIndex];

                    // Animate if not dragging
                    if (!card.dragger?.isDragging) {
                        animateToNewPosition(
                            card,
                            cardsCollectionCopy,
                            setCardsCollection,
                            false
                        );
                    }
                },
            };

            const content = element.querySelector<HTMLElement>('.card-content');

            // Initial positioning
            gsap.set(element, {
                x: card.position.x,
                y: card.position.y,
                width: card.position.width,
                height: card.position.height,
            });

            const animateStartDrag = gsap.to(content, {
                duration: 0.3,
                boxShadow: 'rgba(0,0,0,0.25) 0px 16px 32px 0px',
                scale: 1.05,
                paused: true,
            });

            // Draggable config
            card.dragger = new Draggable(element, {
                type: 'x,y',
                bounds: container,
                onDragStart() {
                    animateStartDrag?.play();
                },
                onDrag() {
                    const clampCol = gsap.utils.clamp(0, columns - 1); // ensure within column bounds
                    const clampRow = gsap.utils.clamp(0, rows - 1); // ensure within row bounds

                    const col = clampCol(
                        Math.round(this.x / card.position.width)
                    );
                    const row = clampRow(
                        Math.round(this.y / card.position.height)
                    );
                    const newIndex = columns * row + col;

                    if (newIndex !== card.index) {
                        handleReorder(cardInstances.current, card, newIndex);
                    }
                },
                onRelease() {
                    animateStartDrag?.reverse();
                    animateToNewPosition(
                        card,
                        cardsCollection,
                        setCardsCollection,
                        true
                    );
                },
            });

            return card;
        }

        // Initialize / Reset
        function init() {
            // Clear previous drag instances
            cardInstances.current.forEach((card) => card.dragger?.kill());

            // Get card elements
            if (!containerRef.current) return;
            const cardElements = Array.from(
                containerRef.current.children
            ) as HTMLElement[];

            // Create card instances for Draggable + positioning + animation
            cardInstances.current = cardElements.map((element, index) =>
                createCard(element, index)
            );

            // Fade in cards
            gsap.to(cardElements, {
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.05,
            });
        }

        init();

        // Rebuild on resize
        const resizeObserver = new ResizeObserver(() => {
            cardInstances.current.forEach((card) => card.dragger?.kill());
            init();
        });
        resizeObserver.observe(container);

        return () => {
            cardInstances.current.forEach((card) => card.dragger?.kill());
            resizeObserver.disconnect();
        };
    }, [cardsCollection, rowHeight, columns]);

    return (
        <div
            style={{
                height: `${rowHeight * Math.ceil(cardsData.length / columns)}px`,
            }}
        >
            <div className='sr-only'>
                Drag and drop the cards to reorder the grid
            </div>
            <div
                ref={containerRef}
                className='relative h-full w-full'
                role='grid'
            >
                {cardsCollection.map((card) => (
                    <Card
                        title={card.title}
                        content={card.content}
                        key={card.id}
                    ></Card>
                ))}
            </div>
        </div>
    );
}

type CardProps = {
    title: string;
    content: string;
};

function Card({ title, content }: CardProps) {
    const cardContentRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            className='card-container absolute cursor-move p-2 opacity-0'
            role='gridcell'
        >
            <div
                ref={cardContentRef}
                className='card-content flex h-full w-full items-start justify-center rounded-xl border bg-secondary text-lg font-bold'
            >
                <div className='m-8 mt-16 text-primary'>
                    <h2 className='text-center'>{title}</h2>
                    <p className='mt-2 text-sm font-normal text-pretty'>
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}
