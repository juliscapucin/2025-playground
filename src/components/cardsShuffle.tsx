import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const cardsData = [
    { title: 'Card 1', src: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg' },
    { title: 'Card 2', src: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg' },
    { title: 'Card 3', src: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg' },
    { title: 'Card 4', src: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg' },
    { title: 'Card 5', src: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg' },
    { title: 'Card 6', src: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg' },
    { title: 'Card 7', src: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg' },
    { title: 'Card 8', src: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg' },
];

export default function Carousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);
    const draggableInstance = useRef<Draggable | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const items = itemsRef.current;
        const cards = items?.childNodes as NodeListOf<HTMLElement> | null;

        if (!container || !cards) return;

        const getViewport = () => ({ width: window.innerWidth });

        const updateRotations = function () {
            const rotation = 0;
            const maxFan = Math.min(180, getViewport().width / 5);
            const start = -maxFan / 2;
            const end = maxFan / 2;

            cards.forEach((card, index) => {
                const progress = index / (cardsData.length - 1);
                const angle = start + progress * (end - start);
                gsap.set(card, { rotation: angle - rotation });
            });
        };

        const setupDraggable = () => {
            cards.forEach((card) => card.classList.add('cursor-grab'));
            draggableInstance.current?.kill?.();
            draggableInstance.current = Draggable.create(container, {
                type: 'rotation',
                inertia: true,
                throwResistance: 0.3,
                onDrag: updateRotations,
                onThrowUpdate: updateRotations,
            })[0];
            gsap.set(container, { overwrite: 'auto' });
        };

        const animateFan = () => {
            const maxFan = Math.min(90, getViewport().width / 5);
            const start = -maxFan / 2;
            const end = maxFan / 2;

            const tl = gsap.timeline();
            cards.forEach((card, index) => {
                const progress = index / (cardsData.length - 1);
                const angle = start + progress * (end - start);
                const yOffset = Math.sin((progress - 0.5) * Math.PI) * 150;
                tl.to(
                    card,
                    {
                        x: 0,
                        y: yOffset,
                        rotation: angle,
                        scale: 0.8,
                        duration: 1.2,
                        ease: 'power2.inOut',
                    },
                    0
                );
            });
            return tl;
        };

        const init = () => {
            gsap.set(cards, { x: 0, y: 0, rotation: 0, scale: 0, opacity: 0 });

            const tl = gsap.timeline({
                onComplete: () => {
                    setupDraggable();
                },
            });

            cards.forEach((card, i) => {
                const delay = (cards.length - 1 - i) * 0.1;
                gsap.set(card, {
                    zIndex: 100 + (cards.length - 1 - i),
                });
                tl.to(
                    card,
                    {
                        opacity: 1,
                        scale: 0.8,
                        duration: 0.5,
                        ease: 'power2.out',
                    },
                    delay
                );
            });

            tl.add(animateFan());
        };

        init();

        return () => {
            draggableInstance.current?.kill?.();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className='relative mx-auto my-32 flex h-60 w-60 items-center justify-center [perspective:2500px]'
        >
            <div ref={itemsRef}>
                {cardsData.map((card, index) => (
                    <div
                        key={index}
                        className='card absolute cursor-pointer overflow-hidden rounded-md bg-cover bg-center select-none'
                    >
                        <Image
                            src={card.src}
                            alt={`Card ${index + 1}`}
                            width={300}
                            height={400}
                            className='h-[400px] w-[300px] object-cover'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
