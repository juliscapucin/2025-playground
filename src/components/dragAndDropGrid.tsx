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
    setIndex: (index: number, positions: Position[]) => void;
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
function animateToPosition(card: CardInstance) {
    gsap.to(card.element, {
        duration: 0.3,
        x: card.position.x,
        y: card.position.y,
        width: card.position.width,
        height: card.position.height,
    });
}

export default function DragAndDropGrid({
    cardsData,
    columns = 6,
    rowHeight = 300,
}: DragAndDropGridProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rows = Math.ceil(cardsData.length / columns); // total rows based on items / columns
    const [cardsCollection, setCardsCollection] = useState(cardsData);
    const positions = useRef<Position[]>([]); // store positions
    const cardInstances = useRef<CardInstance[]>([]); // store Card instances

    useEffect(() => {
        cardInstances.current.forEach((card, index) => {
            card.setIndex(index, positions.current);
        });
    }, [cardsCollection]);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        function handleChangeIndex(
            item: CardInstance,
            newIndex: number,
            positions: Position[]
        ) {
            // Reposition dom elements
            cardInstances.current.splice(
                newIndex,
                0,
                cardInstances.current.splice(item.index, 1)[0]
            );
            cardInstances.current.forEach((card, index) => {
                card.setIndex(index, positions);
                //  container.appendChild(card.element); // reorder DOM for z-index
            });

            // Update state to trigger re-render
            setCardsCollection([...cardsCollection]);
        }

        // Create a Card instance for GSAP animations + Draggable
        function createCard(
            element: HTMLElement,
            index: number,
            positions: Position[]
        ): CardInstance {
            const content = element.querySelector<HTMLElement>('.card-content');
            const clampCol = gsap.utils.clamp(0, columns - 1); // ensure within column bounds
            const clampRow = gsap.utils.clamp(0, rows - 1); // ensure within row bounds

            const animateStartDrag = content
                ? gsap.to(content, {
                      duration: 0.3,
                      boxShadow: 'rgba(0,0,0,0.25) 0px 16px 32px 0px',
                      scale: 1.05,
                      paused: true,
                  })
                : null;

            const card: CardInstance = {
                position: positions[index],
                element,
                index,
                dragger: null,
                setIndex: (
                    i: number,
                    updatedPositions: Position[] = positions
                ) => {
                    card.index = i;
                    card.position = updatedPositions[i];
                    if (!card.dragger?.isDragging) {
                        animateToPosition(card);
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

            // Draggable config
            const dragger = new Draggable(element, {
                type: 'x,y',
                bounds: container,
                onDragStart() {
                    animateStartDrag?.play();
                },
                onDrag() {
                    const col = clampCol(
                        Math.round(this.x / card.position.width)
                    );
                    const row = clampRow(
                        Math.round(this.y / card.position.height)
                    );
                    const newIndex = columns * row + col;

                    if (newIndex !== card.index) {
                        handleChangeIndex(card, newIndex, positions);
                    }
                },
                onRelease() {
                    animateStartDrag?.reverse();
                    animateToPosition(card);
                },
            });

            card.dragger = dragger;

            return card;
        }

        // Initialize / Reset
        function init() {
            cardInstances.current.forEach((card) => card.dragger?.kill());

            positions.current = buildGridPositions(
                containerRef.current,
                columns,
                rows,
                rowHeight
            );
            const cardElements = gsap.utils.toArray<HTMLElement>(
                '.card',
                containerRef.current
            );

            cardInstances.current = cardElements.map((element, index) =>
                createCard(element, index, positions.current)
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
    }, [cardsData, rowHeight, columns]);

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
            {cardsCollection.map((card) => (
                <div
                    key={card.id}
                    className='card absolute cursor-move p-2 opacity-0'
                    role='gridcell'
                >
                    <div className='card-content flex h-full w-full items-start justify-center rounded-xl border bg-secondary text-lg font-bold'>
                        <div className='m-8 mt-16 text-primary'>
                            <h2 className='text-center'>{card.title}</h2>
                            <p className='mt-2 text-sm font-normal text-pretty'>
                                {card.content}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
