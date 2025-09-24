'use client';

import { useEffect, useRef, useState } from 'react';

import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { ButtonClose } from '@/components/buttons';
import { Heading, ImageWithSpinner } from '@/components/ui';
import { Image } from '@/types';

import { animateScrollTo } from '@/lib/animations';

type MinimapProps = {
    images?: Image[];
};

export default function GalleryWithMinimap({ images }: MinimapProps) {
    const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

    const minimapMarkerRef = useRef<HTMLDivElement>(null);
    const minimapRef = useRef<HTMLDivElement>(null);
    const mainGalleryRef = useRef<HTMLDivElement>(null);

    function openFullscreen(
        e: React.MouseEvent<HTMLButtonElement>,
        index: string
    ) {
        setIsFullscreenOpen(true);
        setTimeout(() => {
            animateScrollTo(index, mainGalleryRef.current);
        }, 500);
    }

    function closeFullscreen() {
        setIsFullscreenOpen(false);
    }

    // Minimap Animation
    useGSAP(() => {
        if (
            !mainGalleryRef.current ||
            !minimapRef.current ||
            !minimapMarkerRef.current
        )
            return;

        const thumbnails = minimapRef.current;
        const mainImages = mainGalleryRef.current;
        const mainImagesHeight = mainImages.clientHeight;
        const thumbnailsHeight = thumbnails.clientHeight;
        const markerHeight =
            (window.innerHeight * thumbnailsHeight) / mainImagesHeight;

        gsap.set(minimapMarkerRef.current, { height: markerHeight });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: mainImages,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
            },
        });

        tl.to(thumbnails, {
            y: (thumbnailsHeight - markerHeight) * -1,
            duration: 1,
            ease: 'linear',
        });
    }, []);

    // Close Fullscreen mode on ESC
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setIsFullscreenOpen(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='relative mt-40 flex w-full flex-row items-start justify-between'>
            {/* MAIN GALLERY */}
            <div className='flex-1 pr-8' ref={mainGalleryRef}>
                <Heading tag='h2' variant='headline' classes='h-24'>
                    Gallery Minimap
                </Heading>
                <div className='flex flex-col gap-8'>
                    {images && images.length > 0 ? (
                        images.map((image, index) => (
                            <ImageWithSpinner
                                key={`gallery-image-${index}`}
                                id={`image-${index}`}
                                className={`w-full object-contain`}
                                image={image}
                                sizes='10vw'
                                quality={70}
                            />
                        ))
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
            </div>

            {/* MINIMAP */}
            <aside className='sticky top-[var(--header-height)] z-10 mt-24 hidden w-[var(--minimap-width)] pt-8 md:block'>
                {images && images.length > 1 && (
                    <>
                        {/* MINIMAP MARKER */}
                        <div
                            ref={minimapMarkerRef}
                            className='absolute z-150 w-full border border-secondary'
                        ></div>
                        {/* THUMBNAILS */}
                        <div
                            ref={minimapRef}
                            className='pointer-events-auto relative mx-4 space-y-4'
                        >
                            {images.map((image, index) => (
                                <button
                                    onClick={() =>
                                        animateScrollTo(`image-${index}`)
                                    }
                                    className={`relative w-full`}
                                    key={`project-thumbnail-${index}`}
                                >
                                    <ImageWithSpinner
                                        className={`w-full object-contain`}
                                        image={image}
                                        sizes='10vw'
                                        quality={70}
                                    />
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </aside>

            {/* FULL SCREEN GALLERY */}
            <div className='fixed inset-0 z-100 hidden translate-y-full transform overflow-y-scroll md:block'>
                {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <ImageWithSpinner
                            key={`full-screen-image-${index}`}
                            className={`w-full object-contain`}
                            image={image}
                            sizes='100vw'
                            quality={70}
                        />
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
        </div>
    );
}
