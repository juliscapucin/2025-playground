'use client';

import Image from 'next/image';
import { useLayoutEffect } from 'react';

import gsap from 'gsap';

export default function Home() {
    useLayoutEffect(() => {}, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to('[data-gsap-selector=preloader-progress-bar]', {
                xPercent: 100,
                ease: 'power2.inOut',
                duration: 1.5,
            });
        }, '[data-gsap-selector=preloader-progress-bar]'); // <-- scope for selector text
        return () => ctx.revert(); // <-- cleanup
    }, []);

    return (
        <>
            {/* Preloader Progress */}
            <div className='fixed inset-0 pointer-events-none z-5'>
                {/* Preloader Progress Bar */}
                <div
                    data-gsap-selector='preloader-progress-bar'
                    className='absolute bg-secondary w-1/2 h-full will-change-transform'
                ></div>

                {/* Preloader Logo */}
                <div className='absolute inset-0 flex justify-center items-center'>
                    <h1 className='text-display-large leading-1 text-center text-primary'>
                        Obsidian
                    </h1>
                </div>
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
        </>
    );
}
