'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageField } from '@/types/Image';

type ImageWithSpinnerProps = {
    classes: string;
    sizes: string;
    quality?: number;
    priority?: boolean;
    image: ImageField;
};

export default function ImageWithSpinner({
    classes,
    image,
    sizes,
    quality,
    priority = false,
}: ImageWithSpinnerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const { imageRef, imageAlt, imageWidth, imageHeight } = image;

    return (
        <>
            {isLoading && (
                <div className='bg-faded-5 absolute top-0 left-0 flex h-full w-full items-center justify-center'>
                    <div className='relative aspect-square w-[10%] min-w-12 animate-spin'>
                        <div className='border-faded absolute top-0 left-0 z-10 h-full w-full rounded-full border border-r-secondary'></div>
                        <div className='border-faded-30 absolute top-0 left-0 h-full w-full rounded-full border opacity-20'></div>
                    </div>
                </div>
            )}
            <Image
                className={classes}
                src={'/kristaps-ungurs-4orvBonHMGk-unsplash.jpg'}
                alt={imageAlt}
                sizes={sizes}
                quality={quality ? quality : 70}
                width={imageWidth}
                height={imageHeight}
                onLoad={() => {
                    setIsLoading(false);
                }}
                priority={priority}
            />
        </>
    );
}
