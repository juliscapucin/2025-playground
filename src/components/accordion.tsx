// components/Accordion.js
import { useEffect, useState } from 'react';

const items = [
    {
        title: 'Title for Tab - 1',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    },
    {
        title: 'Title for Tab - 2',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit...',
    },
    {
        title: 'Title for Tab - 3',
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
                        className='accordion-item rounded-full overflow-hidden mb-4'
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? -1 : index)} // Toggle open state
                            aria-expanded={isOpen}
                            aria-controls={`accordion-content-${index}`}
                            id={`accordion-header-${index}`}
                            className='w-full bg-secondary text-left text-primary flex justify-between items-center px-4 py-3 cursor-pointer pr-10 relative transition duration-500 focus:outline-none focus:text-white focus:bg-gray-700'
                        >
                            {item.title}

                            {/* Chevron Icon */}
                            <span
                                className={`h-8 w-8 border border-gray-700 rounded-full inline-flex items-center justify-center transform transition duration-500 ${isOpen ? '-rotate-180 text-white' : ''}`}
                            >
                                <i className='fas fa-chevron-down' />
                            </span>
                        </button>
                        <div
                            className={`bg-gray-800 px-4 overflow-hidden transition-[max-height] duration-500 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
                        >
                            <p className='p-2 text-gray-400 text-justify'>
                                {item.content}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
