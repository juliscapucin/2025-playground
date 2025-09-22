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
    index: number;
};

type DragAndDropGridProps = {
    cardsData: CardData[];
    columns?: number;
    rowHeight?: number;
};

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
function animateToPosition(element: HTMLElement, position: Position) {
    gsap.to(element, {
        duration: 0.3,
        x: position.x,
        y: position.y,
        width: position.width,
        height: position.height,
    });
}

// Handle reordering logic
function handleChangeIndex(
    cardInstances: CardInstance[],
    itemIndex: number,
    newIndex: number
) {
    // Reposition dom elements
    cardInstances.splice(newIndex, 0, cardInstances.splice(itemIndex, 1)[0]);

    cardInstances.forEach((card, index) => {
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

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Create a Card instance for GSAP animations + Draggable
        function createCard(element: HTMLElement, index: number): CardInstance {
            const content = element.querySelector<HTMLElement>('.card-content');

            const card: CardInstance = {
                position: positions.current[index],
                element,
                index,
                dragger: null,
                updatePosition: (i) => {
                    card.index = i;
                    card.position = positions.current[i];
                    if (!card.dragger?.isDragging) {
                        animateToPosition(card.element, card.position);
                    }
                },
            };

            // Initial position
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
            // card.dragger = new Draggable(element, {
            //     type: 'x,y',
            //     bounds: container,
            //     onDragStart() {
            //         animateStartDrag?.play();
            //     },
            //     onDrag() {
            //         const clampCol = gsap.utils.clamp(0, columns - 1); // ensure within column bounds
            //         const clampRow = gsap.utils.clamp(0, rows - 1); // ensure within row bounds

            //         const col = clampCol(
            //             Math.round(this.x / card.position.width)
            //         );
            //         const row = clampRow(
            //             Math.round(this.y / card.position.height)
            //         );
            //         const newIndex = columns * row + col;

            //         if (newIndex !== card.index) {
            //             handleChangeIndex(
            //                 cardInstances.current,
            //                 card,
            //                 newIndex
            //             );
            //         }
            //     },
            //     onRelease() {
            //         animateStartDrag?.reverse();
            //         animateToPosition(card);
            //     },
            // });

            return card;
        }

        // Initialize / Reset

        function init() {
            //   Clear previous drag instances
            cardInstances.current.forEach((card) => card.dragger?.kill());

            // Build positions grid
            positions.current = buildGridPositions(
                containerRef.current,
                columns,
                rows,
                rowHeight
            );

            // Get card elements
            const cardElements = gsap.utils.toArray<HTMLElement>(
                '.card',
                containerRef.current
            );

            // Create card instances for Draggable + animation
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
            ref={containerRef}
            className='relative w-full'
            style={{
                height: `${rowHeight * Math.ceil(cardsData.length / columns)}px`,
            }}
            role='grid'
        >
            <div className='sr-only'>
                Drag and drop the cards to reorder the grid
            </div>
            {cardsCollection.map((card, index) => (
                <Card
                    title={card.title}
                    content={card.content}
                    index={index}
                    key={card.id}
                    position={positions.current[index]}
                    columns={columns}
                    rows={rows}
                ></Card>
            ))}
        </div>
    );
}

type CardProps = {
    title: string;
    content: string;
    index: number;
    position: Position;
    columns: number;
    rows: number;
    cardInstances?: CardInstance[];
};

function Card({
    title,
    content,
    index,
    position,
    columns,
    rows,
    cardInstances,
}: CardProps) {
    const cardContainerRef = useRef<HTMLDivElement | null>(null);
    const cardContentRef = useRef<HTMLDivElement | null>(null);
    const [cardPosition, setCardPosition] = useState<Position>(position);

    useEffect(() => {
        if (!cardContainerRef.current || !cardContentRef.current) return;

        const animateStartDrag = gsap.to(cardContentRef.current, {
            duration: 0.3,
            boxShadow: 'rgba(0,0,0,0.25) 0px 16px 32px 0px',
            scale: 1.05,
            paused: true,
        });

        new Draggable(cardContainerRef.current, {
            type: 'x,y',
            bounds: window,
            onDragStart() {
                animateStartDrag?.play();
            },
            onDrag() {
                const clampCol = gsap.utils.clamp(0, columns - 1); // ensure within column bounds
                const clampRow = gsap.utils.clamp(0, rows - 1); // ensure within row bounds

                const col = clampCol(Math.round(this.x / cardPosition.width));
                const row = clampRow(Math.round(this.y / cardPosition.height));
                const newIndex = columns * row + col;

                if (newIndex !== index && cardInstances) {
                    handleChangeIndex(cardInstances, index, newIndex);
                }
            },
            onRelease() {
                animateStartDrag?.reverse();
                animateToPosition(cardContainerRef.current!, cardPosition);
            },
        });
    }, []);

    return (
        <div
            ref={cardContainerRef}
            className='card absolute cursor-move p-2 opacity-0'
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
