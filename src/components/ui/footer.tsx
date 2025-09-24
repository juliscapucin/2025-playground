'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { Heading, NavLink } from '@/components/ui';

import { socialLinks } from '@/data';

type FooterProps = {
    navlinks?: { label: string; slug: string }[];
};

export default function Footer({ navlinks }: FooterProps) {
    const router = useRouter();
    const footerRef = useRef<HTMLElement>(null);
    const footerContentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!footerRef.current || !footerContentRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top bottom',
                end: 'bottom bottom+=100',
                scrub: 0.2,
            },
        });

        tl.fromTo(
            footerContentRef.current,
            { yPercent: 30 },
            { yPercent: 0, ease: 'power2.out', duration: 1 }
        );
    }, []);

    return (
        <footer ref={footerRef} className='relative h-screen'>
            <div
                ref={footerContentRef}
                className='fixed inset-0 flex items-end justify-center bg-amber-400 text-primary'
            >
                <div className='relative mx-auto flex h-full w-full max-w-[var(--max-width)] flex-col items-start justify-end p-8'>
                    <div className='mb-40 flex h-1/2 w-full items-end justify-between rounded-huge'>
                        <Heading tag='h3' variant='display'>
                            Obsidian
                        </Heading>

                        {navlinks && navlinks.length > 0 && (
                            <ul>
                                {navlinks.map((link) => (
                                    <NavLink
                                        className=''
                                        label={link.label}
                                        key={link.slug}
                                        onClick={() => router.push(link.slug)}
                                    />
                                ))}
                            </ul>
                        )}
                        {socialLinks && socialLinks.length > 0 && (
                            <ul className='self-center'>
                                {socialLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            className='underlined-link text-title-small md:text-title-medium'
                                            href={link.url}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <p>
                        © {new Date().getFullYear()} Obsidian Park. All rights
                        reserved.
                    </p>
                    <p>
                        Design & Development by{' '}
                        <a
                            href='https://juliscapucin.com'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='underlined-link'
                        >
                            Juli Scapucin
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
