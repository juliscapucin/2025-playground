'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Image as ImageType } from '@/types';

type ImageWithSpinnerProps = {
    className?: string;
    wrapperClassName?: string;
    spinnerClassName?: string;
    sizes: string;
    quality?: number;
    priority?: boolean;
    showSpinner?: boolean;
    altFallback?: string;
    image: ImageType;
};

export default function ImageWithSpinner({
    className = '',
    wrapperClassName = '',
    spinnerClassName = '',
    sizes,
    quality = 70,
    priority = false,
    showSpinner = true,
    altFallback = '',
    image,
}: ImageWithSpinnerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { alt, width, height, src } = image;

    return (
        <div
            className={`relative ${wrapperClassName}`}
            aria-busy={isLoading}
            aria-live='polite'
        >
            {showSpinner && isLoading && !hasError && (
                <div
                    className={`bg-faded-5 absolute inset-0 z-10 grid place-items-center ${spinnerClassName}`}
                    role='status'
                    aria-label='Loading image'
                >
                    <div className='relative aspect-square w-[10%] min-w-12 motion-safe:animate-spin'>
                        <div className='border-faded absolute inset-0 z-10 rounded-full border border-r-secondary'></div>
                        <div className='border-faded-30 absolute inset-0 rounded-full border opacity-20'></div>
                    </div>
                    <span className='sr-only'>Loading</span>
                </div>
            )}

            {!hasError ? (
                <Image
                    className={className}
                    src={src}
                    alt={alt || altFallback}
                    sizes={sizes}
                    quality={quality}
                    width={width}
                    height={height}
                    onLoadingComplete={() => setIsLoading(false)}
                    onError={() => {
                        setHasError(true);
                        setIsLoading(false);
                    }}
                    priority={priority}
                />
            ) : (
                <div className='bg-faded-5 flex h-full w-full items-center justify-center text-secondary/70'>
                    <span className='sr-only'>Image failed to load</span>
                    <span aria-hidden>Image failed to load</span>
                </div>
            )}
        </div>
    );
}
