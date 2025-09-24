'use client';

import { useEffect, useState } from 'react';

import { IconChevron } from '@/components/icons';
import { Heading } from './ui';

type AccordionProps = { items: { title: string; content: string }[] };

export default function Accordion({ items }: AccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        function closeOnEsc(e: KeyboardEvent | MouseEvent) {
            if (e instanceof KeyboardEvent && e.key === 'Escape') {
                setOpenIndex(null);
            }
        }
        function closeOnClickOutside(e: MouseEvent) {
            if (!(e.target as HTMLElement).closest('.accordion-item')) {
                setOpenIndex(null);
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
            <Heading tag='h2' variant='headline' classes='mb-16 text-center'>
                FAQ
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
                            onClick={() => setOpenIndex(isOpen ? null : index)} // Toggle open state
                            aria-expanded={isOpen}
                            aria-controls={`accordion-content-${index}`}
                            id={`accordion-header-${index}`}
                            className='group relative flex w-full cursor-pointer items-center justify-between px-4 py-3 pr-10 text-left font-primary text-title-large text-secondary transition duration-600 hover:bg-secondary/50 hover:text-primary focus:bg-secondary/50 focus:text-primary'
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
                            className={`overflow-hidden bg-primary transition-[height] duration-800 ${isOpen ? 'h-fit' : 'h-0'}`}
                        >
                            <p className='mx-4 my-8 text-justify text-secondary'>
                                {item.content}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
