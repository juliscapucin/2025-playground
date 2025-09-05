'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

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

    tl.fromTo(
        '#mask',
        {
            clipPath: 'inset(40% 25% 40% 25% round 128px)',
        },
        {
            clipPath: 'inset(0% 0% 0% 0% round 128px)',
            ease: 'power2.inOut',
            duration: 1.5,
        }
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
                .add(animateMask(), 2.5);
        }, outerContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={outerContainerRef} className='relative h-svh w-full'>
            {/* Preloader Progress */}
            <div className='fixed h-full w-full flex flex-col justify-center items-center overflow-clip pointer-events-none z-10'>
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

            {/* Preloader Content */}
            <div className='fixed inset-0 pointer-events-none'>
                <div className='preloader-footer'>
                    <p>lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                </div>
            </div>

            {/* Container */}
            {/* Hero */}
            <div id='mask' className='relative h-full w-full'>
                {/* Hero Inner */}
                <div className='relative w-full h-full'>
                    {/* Hero Content */}
                    <div className='absolute w-full h-full z-5 flex justify-center items-center'>
                        <div>
                            <div className='header'>
                                <h1 className='text-display-large'>
                                    Welcome to Obsidian
                                </h1>
                            </div>
                            <div className='contact-btn'>Contact</div>
                            <div className='menu-btn'>Menu</div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className='absolute inset-0 will-change-transform'>
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
                    <div className='absolute bottom-0 w-full p-8 z-5 flex justify-between items-start'>
                        <h3 className='text-title-large left-0 w-1/4'>
                            Spaces defined through light and silence
                        </h3>
                        <p className='text-body-medium w-1/4 text-right'>
                            lorem ipsum Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Id error architecto dolores porro
                            quae possimus sequi adipisci pariatur facere
                            corporis totam neque rem voluptatem eaque, aliquid.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
