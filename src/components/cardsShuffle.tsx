import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);

import { animateSplitText } from '@/lib/animations';
import { Heading } from '@/components/ui';

const cardsData = [
    { title: 'Card 1', src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg' },
    { title: 'Card 2', src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg' },
    { title: 'Card 3', src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg' },
    { title: 'Card 4', src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg' },
    { title: 'Card 5', src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg' },
    { title: 'Card 6', src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg' },
    { title: 'Card 7', src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg' },
    { title: 'Card 8', src: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg' },
];

const cardsShuffleAnimation = (cards: HTMLElement[]) => {
    const tl = gsap.timeline();
    tl.fromTo(
        cards,
        {
            rotation: 0,
            scale: 0,
            opacity: 0,
        },
        {
            rotation: () => gsap.utils.random(-15, 15),
            scale: 0.8,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.1,
        }
    );
    return tl;
};

export default function Carousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const items = itemsRef.current;
        const cards = gsap.utils.toArray('.card', items) as HTMLElement[];

        if (!container || !cards) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%', // when the top of the trigger hits 80% of the viewport height
                    end: 'bottom center',
                    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
                },
            });

            tl.add(cardsShuffleAnimation(cards)).add(
                animateSplitText(
                    "[data-gsap='cards-shuffle-heading']",
                    'chars',
                    1,
                    0.03
                ),
                '<0.4' // start 0.4 seconds before the previous animation ends
            );
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className='relative mx-auto my-32 h-[80svh] w-full'
        >
            <div className='pointer-events-none absolute z-10 flex h-full w-full items-center justify-center'>
                <Heading
                    tag='h2'
                    variant='display'
                    data-gsap='cards-shuffle-heading'
                >
                    Collections
                </Heading>
            </div>
            <div
                ref={itemsRef}
                className='flex h-full w-full items-center justify-center'
            >
                {cardsData.map((card, index) => (
                    <div
                        key={index}
                        className='card absolute aspect-square w-[30vw] cursor-pointer overflow-hidden rounded-md bg-cover bg-center opacity-0'
                    >
                        <Image
                            src={card.src}
                            alt={`Card ${index + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
