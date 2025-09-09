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
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <div className='mx-auto my-64 flex h-96 w-full gap-4 overflow-hidden'>
            <div>
                <Heading tag='h2' variant='headline' classes='flex-2'>
                    Seasons
                </Heading>
                <p className='mt-4 max-w-sm text-secondary/70'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                </p>
            </div>
            {cards.map((card, index) => (
                <div
                    key={index}
                    onMouseEnter={() => setActiveIdx(index)}
                    onMouseLeave={() => setActiveIdx(-1)}
                    className={`relative flex-none cursor-pointer overflow-clip rounded-3xl transition-all duration-500 ${activeIdx === index ? 'grow-[10]' : 'grow'} `}
                >
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
                    <div className='absolute bottom-4 left-4 flex items-center gap-4 text-secondary'>
                        <div className='rounded-full bg-primary px-4 py-1 uppercase'>
                            {card.title}
                        </div>
                        <div
                            className={`text-body-medium text-nowrap transition-opacity duration-300 ${activeIdx === index ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {card.subtitle}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
