'use client';

import { useRef } from 'react';

import { ButtonClose } from '@/components/buttons';
import { Heading, ImageWithSpinner } from '@/components/ui';
import { Image } from '@/types';

import { animateScrollTo } from '@/lib/animations';

type MinimapProps = {
    images?: Image[];
    artistName: string;
};

export default function GalleryWithMinimap({
    images,
    artistName,
}: MinimapProps) {
    const minimapMarkerRef = useRef<HTMLDivElement>(null);
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    return (
        <div className='relative mt-40 flex w-full flex-row items-start justify-between'>
            {/* GALLERY */}
            <div className='flex-1 pr-8'>
                <Heading tag='h2' variant='headline' classes='h-24'>
                    Gallery Minimap
                </Heading>
                <div className='flex flex-col gap-8'>
                    {images && images.length > 0 ? (
                        images.map((image, index) => (
                            <ImageWithSpinner
                                key={`gallery-image-${index}`}
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
            <aside className='sticky top-[var(--header-height)] z-150 mt-24 hidden w-[var(--minimap-width)] md:block'>
                {images && images.length > 1 && (
                    <>
                        {/* MINIMAP MARKER */}
                        <div
                            ref={minimapMarkerRef}
                            className='absolute z-150 h-[13.7svh] w-full border border-secondary'
                        ></div>
                        {/* THUMBNAILS */}
                        <div
                            ref={thumbnailsRef}
                            className='pointer-events-auto relative mx-4 space-y-4'
                        >
                            {images.map((image, index) => (
                                <button
                                    onClick={() => animateScrollTo(`index`)}
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
