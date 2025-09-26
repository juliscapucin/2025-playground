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
import { useGSAP } from '@gsap/react';

import { images } from '@/data';

const cardsData = [
    { title: 'Card 1', src: images[0].src },
    { title: 'Card 2', src: images[1].src },
    { title: 'Card 3', src: images[2].src },
    { title: 'Card 4', src: images[3].src },
];

const cardsShuffleAnimation = (cards: HTMLElement[]) => {
    const tl = gsap.timeline();

    gsap.set(cards, { xPercent: 0, yPercent: 0 });

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
        xPercent: gsap.utils.wrap([-50, -100, 0, 100, 50]),
        yPercent: gsap.utils.wrap([100, 50, 0, 50, 100]),
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
    });
    return tl;
};

const cardTossAnimation = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
        inertia: {
            x: {
                velocity: 500,
                max: 20,
                min: 0,
            },
            y: {
                velocity: -300,
                max: 20,
                min: 0,
            },
            rotation: {
                velocity: gsap.utils.random(-50, 50),
                max: 20,
                min: -20,
            },
        },
    });
};

export default function Carousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const container = containerRef.current;
        const items = itemsRef.current;
        const cards = gsap.utils.toArray('.card', items) as HTMLElement[];

        if (!container || !cards) return;

        const tl = gsap.timeline({
            // ScrollTrigger
            scrollTrigger: {
                id: 'cards-shuffle',
                trigger: container,
                start: 'top 5%',
                end: '+=400%',
                scrub: 0,
                pin: true,
                // markers: true,
            },
        });

        tl.add(
            // Text Animation
            animateSplitText(
                "[data-gsap='cards-shuffle-heading']",
                'chars',
                1,
                0.03
            )
        )
            // Shuffle cards
            .add(cardsShuffleAnimation(cards), '<')
            // Expand cards
            .add(cardsExpansionAnimation(cards));
    }, []);

    return (
        <div
            ref={containerRef}
            className='relative mx-auto my-64 h-[calc(100vh-var(--header-height))] w-full'
        >
            <div className='pointer-events-none absolute inset-0 z-10 flex h-full w-full items-center justify-center text-accent'>
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
                        className={`card absolute aspect-square w-[r0vw] cursor-pointer overflow-hidden rounded-md bg-cover bg-center md:w-[35vw] lg:w-[25vw]`}
                        onMouseEnter={(e) => cardTossAnimation(e)}
                    >
                        <Image
                            src={card.src}
                            alt={`Card ${index + 1}`}
                            fill
                            sizes='30vw'
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
