import { useEffect, useState } from 'react';

import { IconChevron } from '@/components/icons';
import { Heading } from './ui';

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
        <div className='container mx-auto my-32 px-4'>
            <Heading tag='h2' variant='headline'>
                Accordion
            </Heading>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className='accordion-item overflow-hidden border-t border-secondary/20 last:border-b'
                    >
                        {/* Header */}
                        <button
                            onClick={() => setOpenIndex(isOpen ? -1 : index)} // Toggle open state
                            aria-expanded={isOpen}
                            aria-controls={`accordion-content-${index}`}
                            id={`accordion-header-${index}`}
                            className='group relative flex w-full cursor-pointer items-center justify-between px-4 py-3 pr-10 text-left font-primary text-secondary transition duration-600 hover:bg-secondary/50 hover:text-primary focus:bg-secondary/50 focus:text-primary'
                        >
                            {item.title}

                            {/* Chevron Icon */}
                            <span className='flex h-8 w-8 items-center justify-center text-secondary group-hover:text-primary group-focus:text-primary'>
                                <IconChevron
                                    direction={isOpen ? 'down' : 'up'}
                                />
                            </span>
                        </button>

                        {/* Content Area */}
                        <div
                            className={`overflow-hidden bg-primary transition-[max-height] duration-800 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
                        >
                            <p className='m-4 text-justify text-secondary'>
                                {item.content}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
