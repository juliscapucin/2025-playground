'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { GSDevTools } from 'gsap/GSDevTools';
gsap.registerPlugin(SplitText);
gsap.registerPlugin(GSDevTools);

import { ExpandableCards, Accordion, CardsShuffle } from '@/components';
import { animateSplitText } from '@/lib/animations';

function animatedProgressBar() {
    const tl = gsap.timeline();

    // Total number of "loading steps" before completion
    const steps = 5;

    // Track the current progress (0 = 0%, 1 = 100%)
    let currentProgress = 0;

    // Loop through each step
    for (let i = 0; i < steps; i++) {
        // Check if this is the final step (always ends at 100%)
        const finalStep = i === steps - 1;

        // Decide the target progress for this step:
        // - If final step → set to 1 (100%)
        // - Otherwise → randomly increase progress by 10–40% (0.1–0.4)
        //   but make sure it doesn’t go beyond 90% (0.9)
        const targetProgress = finalStep
            ? 1
            : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);

        // Update the "currentProgress" tracker
        currentProgress = targetProgress;

        tl.to("[data-gsap='preloader-progress-bar']", {
            scaleX: targetProgress,
            ease: 'power2.out',
            duration: 2 / steps, // total time is 2s, split across steps
        });
    }

    return tl;
}

function animateMask() {
    const tl = gsap.timeline();

    tl.set('[data-gsap="mask"]', { opacity: 1 })
        .fromTo(
            '[data-gsap="mask"]',
            {
                clipPath: 'inset(50% 40% 50% 40% round var(--radius-huge))',
            },
            {
                clipPath: 'inset(0% 0% 0% 0% round var(--radius-huge))',
                ease: 'power2.out',
                duration: 1,
            }
        )
        .to(
            '[data-gsap="hero-image"]',
            {
                scale: 1,
                ease: 'power4.out',
                duration: 1,
            },
            '<'
        );

    return tl;
}

export default function Home() {
    const outerContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!outerContainerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.add(animatedProgressBar())
                .add(
                    animateSplitText(
                        "[data-gsap='preloader-text']",
                        'chars',
                        0.6,
                        0.05
                    )
                )
                .add(animateMask(), 'mask') // label for mask start
                // Fade out progress bar container
                .to(
                    "[data-gsap='preloader-progress-bar-container']",
                    {
                        opacity: 0,
                        duration: 0.3,
                    },
                    'mask' // start at the same time as animateMask
                )
                .add(
                    animateSplitText(
                        "[data-gsap='welcome-text']",
                        'chars',
                        0.8,
                        0.05
                    ),
                    'mask'
                )
                .add(animateSplitText("[data-gsap='links']", 'lines'), '<0.6')
                .add(
                    animateSplitText(
                        "[data-gsap='hero-footer-heading']",
                        'lines'
                    ),
                    '<0.2'
                )
                .add(
                    animateSplitText(
                        "[data-gsap='hero-footer-paragraph']",
                        'lines'
                    ),
                    '<0.1'
                );

            // GSDevTools.create({ animation: tl });
        }, outerContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div ref={outerContainerRef} className='relative h-svh w-full'>
                {/* Preloader Progress */}
                <div
                    data-gsap='preloader-progress-bar-container'
                    className='pointer-events-none absolute inset-0 z-10 flex items-center justify-center'
                >
                    {/* Preloader Progress Bar */}
                    <div className='relative h-fit w-fit overflow-clip rounded-huge px-12'>
                        {/* Preloader Logo */}

                        <div
                            data-gsap='preloader-progress-bar'
                            className='absolute inset-0 z-0 origin-left scale-x-0 transform bg-secondary will-change-transform'
                        ></div>
                        <h1
                            data-gsap='preloader-text'
                            className='z-50 text-center text-display-small text-primary md:text-display-medium xl:text-display-large'
                        >
                            Obsidian
                        </h1>
                    </div>
                </div>

                {/* Hero */}
                <div
                    data-gsap='mask'
                    className='relative h-full w-full opacity-0'
                >
                    {/* Hero Content */}
                    <div className='absolute flex h-full w-full items-center justify-center'>
                        <h1
                            data-gsap='welcome-text'
                            className='z-5 text-display-large leading-36'
                        >
                            Welcome to Obsidian
                        </h1>
                    </div>

                    {/* Links */}
                    <div data-gsap='links' className='absolute z-5 p-12'>
                        <div className='contact-btn'>Contact</div>
                        <div className='menu-btn'>Menu</div>
                    </div>

                    {/* Hero Image */}
                    <div
                        data-gsap='hero-image'
                        className='absolute top-0 left-0 -z-1 h-full w-full scale-125 transform will-change-transform'
                    >
                        <div className='absolute inset-0 z-5 bg-radial from-transparent from-20% to-primary'></div>
                        <Image
                            src='/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg'
                            alt='Logo'
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                            sizes='(max-width: 768px) 100vw'
                        />
                    </div>

                    {/* Hero Footer */}
                    <div className='absolute bottom-0 z-5 flex w-full items-start justify-between p-12'>
                        <h3
                            data-gsap='hero-footer-heading'
                            className='left-0 w-1/4 text-title-large'
                        >
                            Spaces defined through light and silence
                        </h3>
                        <p
                            data-gsap='hero-footer-paragraph'
                            className='w-1/4 text-right text-body-medium'
                        >
                            lorem ipsum Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Id error architecto dolores porro
                            quae possimus sequi adipisci pariatur.
                        </p>
                    </div>
                </div>
            </div>
            <ExpandableCards />
            <CardsShuffle />
            <Accordion />
        </>
    );
}
