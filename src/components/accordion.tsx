// components/Accordion.js
import { useEffect, useState } from 'react';

import { IconChevron } from '@/components/icons';

const items = [
    {
        title: 'First Title for Tab',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    },
    {
        title: 'Second Title for Tab',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    },
    {
        title: 'Third Title for Tab',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    },
];

export default function Accordion() {
    const [openIndex, setOpenIndex] = useState(-1);

    useEffect(() => {
        function closeOnEsc(e: KeyboardEvent | MouseEvent) {
            if (e instanceof KeyboardEvent && e.key === 'Escape') {
                setOpenIndex(-1);
            }
        }
        function closeOnClickOutside(e: MouseEvent) {
            if (!(e.target as HTMLElement).closest('.accordion-item')) {
                setOpenIndex(-1);
            }
        }
        document.addEventListener('click', closeOnClickOutside);
        document.addEventListener('keydown', closeOnEsc);
        return () => {
            document.removeEventListener('keydown', closeOnEsc);
            document.removeEventListener('click', closeOnClickOutside);
        };
    }, []);

    return (
        <div className='container mx-auto my-8 px-4'>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className='accordion-item mb-4 overflow-hidden border-y border-secondary'
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? -1 : index)} // Toggle open state
                            aria-expanded={isOpen}
                            aria-controls={`accordion-content-${index}`}
                            id={`accordion-header-${index}`}
                            className='relative flex w-full cursor-pointer items-center justify-between bg-secondary/10 px-4 py-3 pr-10 text-left text-secondary uppercase transition duration-500 focus:bg-secondary/50 focus:text-primary'
                        >
                            {item.title}

                            {/* Chevron Icon */}
                            <span
                                className={`inline-flex h-8 w-8 transform items-center justify-center rounded-full border border-gray-700 transition duration-500 ${isOpen ? '-rotate-180 text-white' : ''}`}
                            >
                                <IconChevron
                                    direction={isOpen ? 'up' : 'down'}
                                />
                            </span>
                        </button>
                        <div
                            className={`overflow-hidden bg-gray-800 px-4 transition-[max-height] duration-500 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
                        >
                            <p className='p-2 text-justify text-gray-400'>
                                {item.content}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
