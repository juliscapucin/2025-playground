'use client';

import { useRef } from 'react';

import { ButtonClose } from '@/components/buttons';
import { ImageWithSpinner } from '@/components/ui';
import { Image } from '@/types';

import { animateScrollTo } from '@/lib/animations';
import { parse } from 'path';

type MinimapProps = {
    images?: Image[];
    artistName: string;
};

export default function Minimap({ images, artistName }: MinimapProps) {
    const minimapMarkerRef = useRef<HTMLDivElement>(null);
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    return (
        <div className='pointer-events-none fixed top-0 right-0 bottom-0 left-0 z-150 hidden md:block'>
            <div className='max-w-desktop relative mx-auto'>
                <aside className='lg:[var(--margin-desktop)] absolute top-0 right-[var(--margin-mobile)] z-150 h-full w-[13vw] max-w-[170px]'>
                    {/* MINIMAP */}
                    {images && images.length > 1 && (
                        <>
                            {/* MINIMAP MARKER */}
                            <div
                                ref={minimapMarkerRef}
                                className='absolute top-[272px] z-150 h-[13.7svh] w-[13vw] max-w-[176px] border border-secondary xl:-translate-x-[3px]'
                            ></div>
                            {/* THUMBNAILS */}
                            <div
                                ref={thumbnailsRef}
                                className='pointer-events-auto relative mx-auto mt-12 w-[10vw] max-w-[160px] space-y-2'
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
            </div>
        </div>
    );
}
