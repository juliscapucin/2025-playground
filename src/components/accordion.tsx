'use client';

import { useEffect, useState } from 'react';

import { IconChevron } from '@/components/icons';
import { Heading } from './ui';

const items = [
    {
        title: 'When is the park open?',
        content:
            'Obsidian Park is open year-round, with facilities and services varying by season. During winter, some backcountry trails may be closed due to snow and safety concerns, while summer months see extended opening hours and ranger-led programs. Always check our seasonal updates before your visit to avoid surprises.',
    },
    {
        title: 'What should I pack for my visit?',
        content:
            'Packing will depend on the season and activities you plan to enjoy. In spring and summer, bring sturdy hiking shoes, insect repellent, sunscreen, and plenty of drinking water. Lightweight rain gear is recommended, as weather can change quickly in the mountains. For those camping overnight, pack a warm sleeping bag, a tent suitable for variable conditions, and food storage containers to keep wildlife at a safe distance. In fall, temperatures can drop suddenly, so layered clothing is essential, along with gloves and a hat. Winter visitors should come prepared with insulated boots, thermal clothing, snowshoes or skis if you plan to explore trails, and emergency supplies such as a flashlight, matches, and extra food in case of weather delays. Year-round, we advise bringing a printed map of the park, as cell service may be unreliable in remote areas. By planning ahead and packing thoughtfully, you’ll ensure a safe and enjoyable visit to Obsidian Park.',
    },
    {
        title: 'Are there safety tips for hiking?',
        content:
            'Yes. When hiking in Obsidian Park, it is important to follow established trails and avoid shortcuts that can cause erosion or lead to dangerous terrain. Always let someone know your route and expected return time, especially if exploring less-traveled paths. Carry sufficient water and snacks, and be mindful of weather changes, which can occur rapidly in the region. Bear safety is critical: carry bear spray, make noise while hiking to avoid surprising wildlife, and never leave food unattended. Cell service is limited, so consider carrying a GPS or map and compass. Rangers also recommend checking trail conditions before heading out, as closures may occur due to flooding, rockfall, or maintenance. With preparation and awareness, hiking in the park can be both safe and deeply rewarding.',
    },
    {
        title: 'What wildlife might I see?',
        content:
            'Obsidian Park is home to a wide range of wildlife. Large mammals include moose, deer, black bears, and occasionally wolves, while smaller creatures such as beavers, otters, and foxes are also commonly spotted. Bird enthusiasts can enjoy sightings of bald eagles, loons, and over 100 species of migratory birds depending on the season. Spring and summer bring vibrant activity, with wildflower meadows attracting pollinators and migratory birds. In autumn, you may catch sight of moose during rutting season, and in winter, fresh snow reveals the tracks of elusive animals like lynx. For the safety of both visitors and wildlife, always observe animals from a distance and never feed them.',
    },
    {
        title: 'Is the park accessible?',
        content:
            'Yes, Obsidian Park is committed to accessibility. The visitor centre, several picnic areas, and a selection of main trails are wheelchair accessible. Boardwalk paths provide access to scenic viewpoints and wetlands, and accessible washroom facilities are available throughout the park. The staff can also provide information on accessible campsites and recommend trails suitable for mobility aids. For visitors with vision impairments, some guided programs include descriptive elements to help bring the landscape and wildlife to life. We are continually working to expand accessibility options so that everyone can enjoy the park.',
    },
    {
        title: 'Can I fish or canoe in the park?',
        content:
            'Yes, both activities are popular in Obsidian Park. Canoeing and kayaking are permitted on designated lakes and rivers, with rental options available near the visitor centre. Fishing is allowed with a valid provincial fishing license, and common catches include trout and northern pike. To protect fragile ecosystems, some areas are off-limits to boating or fishing, and seasonal restrictions may apply during spawning periods. Please review our guidelines before your trip, and always practice Leave No Trace principles when enjoying the park’s waterways.',
    },
];

export default function Accordion() {
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
