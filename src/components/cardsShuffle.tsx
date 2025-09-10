'use client';

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
];

const cardWidth = '25vw';

const cardsShuffleAnimation = (cards: HTMLElement[]) => {
    const tl = gsap.timeline();
    tl.fromTo(
        cards,
        {
            rotation: 0,
            scale: 0,
        },
        {
            rotation: () => gsap.utils.random(-15, 15),
            scale: 0.8,
            duration: 1,
            ease: 'power2.out',
            stagger: 0.1,
        }
    );
    return tl;
};

const cardsExpansionAnimation = (cards: HTMLElement[]) => {
    const tl = gsap.timeline();
    tl.to(cards, {
        //   rotation: 0,
        xPercent: gsap.utils.wrap([-50, -100, 0, 100, 50]),
        yPercent: gsap.utils.wrap([100, 50, 0, 50, 100]),
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
    });
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
                // ScrollTrigger
                scrollTrigger: {
                    trigger: container,
                    start: 'top 10%',
                    scrub: 1,
                    pin: true,
                },
            });

            tl.add(cardsShuffleAnimation(cards)) // Shuffle cards
                // Text Animation
                .add(
                    animateSplitText(
                        "[data-gsap='cards-shuffle-heading']",
                        'chars',
                        1,
                        0.03
                    ),
                    '<0.4' // start 0.4 seconds before the previous animation ends
                )
                // Expand cards
                .add(cardsExpansionAnimation(cards), '>');
        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className='relative mx-auto my-32 h-[70vw] w-full rounded-3xl border border-secondary/10 py-8 lg:h-[50vw]'
        >
            <div className='pointer-events-none absolute z-10 flex h-full w-full items-center justify-center'>
                <Heading
                    tag='h2'
                    variant='display'
                    data-gsap='cards-shuffle-heading'
                >
                    Photo Galleries
                </Heading>
            </div>
            <div
                ref={itemsRef}
                className='flex h-full w-full items-start justify-center'
            >
                {cardsData.map((card, index) => (
                    <div
                        key={index}
                        className={`card absolute aspect-square w-[35vw] cursor-pointer overflow-hidden rounded-md bg-cover bg-center lg:w-[25vw]`}
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
