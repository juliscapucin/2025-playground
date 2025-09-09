import { useState } from 'react';
import Image from 'next/image';

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
        <div className='flex w-full max-w-7xl h-96 gap-4 overflow-hidden mt-32 mb-16 mx-auto'>
            {cards.map((card, index) => (
                <div
                    key={index}
                    onMouseEnter={() => setActiveIdx(index)}
                    onMouseLeave={() => setActiveIdx(-1)}
                    className={`
            flex-none cursor-pointer transition-all duration-500 relative rounded-3xl bg-secondary overflow-clip
            ${activeIdx === index ? 'grow-[10]' : 'grow'}
          `}
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
                    <div className='absolute bottom-4 left-4 text-secondary flex items-center gap-4'>
                        <div className='uppercase bg-primary py-1 px-4 rounded-full'>
                            {card.title}
                        </div>
                        <div
                            className={`text-body-medium transition-opacity text-nowrap duration-300 ${activeIdx === index ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {card.subtitle}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
