'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Heading } from '@/components/ui';

const cards = [
    {
        title: 'Autumn',
        subtitle: 'Omuke trughte a otufta',
        image: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg',
    },
    {
        title: 'Winter',
        subtitle: 'Omuke trughte a otufta',
        image: '/vitalii-khodzinskyi-kzO8qaUSuF4-unsplash.jpg',
    },
    {
        title: 'Spring',
        subtitle: 'Omuke trughte a otufta',
        image: '/will-xiang-0uAFB81e9u0-unsplash.jpg',
    },
    {
        title: 'Summer',
        subtitle: 'Omuke trughte a otufta',
        image: '/kristaps-ungurs-4orvBonHMGk-unsplash.jpg',
    },
];

export default function ExpandableCards() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className='mx-auto my-64 w-full'>
            <div className=''>
                <Heading tag='h2' variant='headline' classes='flex-2'>
                    Plan ahead for every season
                </Heading>
                <p className='mt-4 mb-8 max-w-sm text-balance text-secondary'>
                    Discover what each season brings, from spring blooms to
                    winter trails, and make the most of your visit year-round.
                </p>
            </div>
            <div className='flex h-[60vh] w-full gap-4'>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`group relative flex-none grow cursor-pointer transition-all duration-500 hover:grow-[10]`}
                    >
                        <div className='relative h-full grow overflow-clip rounded-3xl'>
                            <div className='absolute inset-0'>
                                <Image
                                    src={card.image}
                                    alt={card.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes='(max-width: 768px) 30vw'
                                />
                            </div>

                            {/* Label */}
                            <h3 className='absolute bottom-4 left-4 w-fit rounded-full bg-accent px-4 py-1 text-dark uppercase'>
                                {card.title}
                            </h3>
                        </div>
                        {/* Subtitle */}
                        <p
                            className={`absolute -bottom-8 left-4 text-body-medium text-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                        >
                            {card.subtitle}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
