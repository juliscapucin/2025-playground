import { useState } from 'react';

const cards = [
    {
        title: 'Autumn',
        subtitle: 'Omuke trughte a otufta',
        image: 'https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg',
    },
    {
        title: 'Winter',
        subtitle: 'Omuke trughte a otufta',
        image: 'https://66.media.tumblr.com/5af3f8303456e376ceda1517553ba786/tumblr_o4986gakjh1qho82wo1_1280.jpg',
    },
    {
        title: 'Spring',
        subtitle: 'Omuke trughte a otufta',
        image: 'https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg',
    },
    {
        title: 'Summer',
        subtitle: 'Omuke trughte a otufta',
        image: 'https://66.media.tumblr.com/f19901f50b79604839ca761cd6d74748/tumblr_o65rohhkQL1qho82wo1_1280.jpg',
    },
];

export default function Accordion() {
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
                    <div className='absolute inset-0'></div>

                    {/* Label */}
                    <div className='absolute bottom-4 left-4 text-primary flex items-center gap-4'>
                        <div className='font-bold'>{card.title}</div>
                        <div
                            className={`text-sm transition-opacity text-nowrap duration-300 ${activeIdx === index ? 'opacity-100' : 'opacity-0'}`}
                        >
                            {card.subtitle}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
