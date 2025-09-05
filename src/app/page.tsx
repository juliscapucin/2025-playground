'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { GSDevTools } from 'gsap/GSDevTools';
gsap.registerPlugin(SplitText);
gsap.registerPlugin(GSDevTools);

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

function animateProgressBarText() {
    const tl = gsap.timeline();

    const split = SplitText.create("[data-gsap='preloader-text']", {
        type: 'chars',
    });
    tl.fromTo(
        split.chars,
        {
            yPercent: 150,
        },
        {
            yPercent: 0,
            stagger: 0.1,
            duration: 0.6,
        }
    );

    return tl;
}

function animateMask() {
    const tl = gsap.timeline();

    tl.set('[data-gsap="mask"]', { opacity: 1 })
        .fromTo(
            '[data-gsap="mask"]',
            {
                clipPath: 'inset(40% 25% 40% 25% round var(--radius-huge))',
            },
            {
                clipPath: 'inset(0% 0% 0% 0% round var(--radius-huge))',
                ease: 'power2.inOut',
                duration: 0.6,
            }
        )
        .to(
            '[data-gsap="hero-image"]',
            {
                scale: 1,
                ease: 'power4.inOut',
                duration: 1,
            },
            '<'
        );

    return tl;
}

export default function Home() {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const outerContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!outerContainerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.add(animatedProgressBar())
                .add(animateProgressBarText(), 0.5)
                .add(animateMask(), 2.5)
                .to(
                    "[data-gsap='preloader-progress-bar-container']",
                    {
                        opacity: 0,
                        duration: 0.3,
                    },
                    2.5
                );

            GSDevTools.create({ animation: tl });
        }, outerContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={outerContainerRef} className='relative h-full w-full'>
            {/* Preloader Progress */}
            <div
                data-gsap='preloader-progress-bar-container'
                className='fixed h-full w-full flex flex-col justify-center items-center overflow-clip pointer-events-none z-10'
            >
                {/* Preloader Progress Bar */}
                <div className='w-1/2 h-1/5 bg-primary rounded-huge overflow-clip'>
                    <div
                        data-gsap='preloader-progress-bar'
                        className='bg-secondary w-full h-full will-change-transform transform scale-x-0 origin-left'
                    ></div>
                </div>

                {/* Preloader Logo */}
                <div className='absolute w-1/2 h-1/5 flex justify-center items-center overflow-clip'>
                    <h1
                        data-gsap='preloader-text'
                        className='text-display-small md:text-display-medium xl:text-display-large text-center text-primary'
                    >
                        Obsidian
                    </h1>
                </div>
            </div>

            {/* Hero */}
            <div data-gsap='mask' className='relative h-full w-full opacity-0'>
                {/* Hero Content */}
                <div className='absolute w-full h-full flex justify-center items-center'>
                    <h1 className='text-display-large leading-24 z-5'>
                        Welcome to Obsidian
                    </h1>
                </div>

                {/* Links */}
                <div data-gsap='links' className='absolute p-12 z-5'>
                    <div className='contact-btn'>Contact</div>
                    <div className='menu-btn'>Menu</div>
                </div>

                {/* Hero Image */}
                <div
                    data-gsap='hero-image'
                    className='transform scale-125 absolute top-0 left-0 w-full h-full -z-1'
                >
                    <Image
                        src='/kristaps-ungurs-4orvBonHMGk-unsplash.jpg'
                        alt='Logo'
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        sizes='(max-width: 768px) 20vw, 33vw'
                    />
                </div>

                {/* Hero Footer */}
                <div className='absolute bottom-0 w-full p-12 flex justify-between items-start z-5 '>
                    <h3 className='text-title-large left-0 w-1/4'>
                        Spaces defined through light and silence
                    </h3>
                    <p className='text-body-medium w-1/4 text-right'>
                        lorem ipsum Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Id error architecto dolores porro quae
                        possimus sequi adipisci pariatur.
                    </p>
                </div>
            </div>
        </div>
    );
}
