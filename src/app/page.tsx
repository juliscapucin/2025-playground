'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';

function animatedProgressBar() {
    const tl = gsap.timeline();
    const steps = 5;
    let currentProgress = 0;

    for (let i = 0; i < steps; i++) {
        const finalStep = i === steps - 1;
        const targetProgress = finalStep
            ? 1
            : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
        currentProgress = targetProgress;
        tl.to("[data-gsap='preloader-progress-bar']", {
            xPercent: targetProgress * 100,
            ease: 'power2.inOut',
            duration: 2 / steps,
        });
    }
    return tl;
}

export default function Home() {
    const progressBarRef = useRef<HTMLDivElement>(null);
    const outerContainerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!outerContainerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.add(animatedProgressBar());
        }, outerContainerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={outerContainerRef} className='relative h-svh w-full'>
            {/* Preloader Progress */}
            <div className='fixed h-full w-full flex flex-col justify-center items-center pointer-events-none z-5'>
                {/* Preloader Progress Bar */}
                <div className='w-1/2 h-1/4 rounded-huge overflow-clip'>
                    <div
                        data-gsap='preloader-progress-bar'
                        className='-translate-x-full bg-secondary w-full h-full will-change-transform'
                    ></div>
                </div>

                {/* Preloader Logo */}
                <h1 className='absolute block text-display-large text-center text-primary'>
                    Obsidian
                </h1>
            </div>

            {/* Preloader Mask */}
            <div className='fixed inset-0 rounded-huge pointer-events-none'></div>

            {/* Preloader Content */}
            <div className='fixed inset-0 pointer-events-none'>
                <div className='preloader-footer'>
                    <p>lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                </div>
            </div>

            {/* Container */}
            <div className='relative h-full w-full'>
                {/* Hero */}
                <div className='relative h-full w-full'>
                    {/* Hero Inner */}
                    <div className='relative w-full h-full rounded-huge overflow-clip'>
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
                                lorem ipsum Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Id error
                                architecto dolores porro quae possimus sequi
                                adipisci pariatur facere corporis totam neque
                                rem voluptatem eaque, aliquid.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
