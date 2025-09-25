'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { ExternalLink, Heading, NavLink } from '@/components/ui';

import { socialLinks } from '@/data';

type FooterProps = {
    navlinks?: { label: string; slug: string }[];
};

export default function Footer({ navlinks }: FooterProps) {
    const router = useRouter();
    const footerRef = useRef<HTMLElement>(null);
    const footerContentRef = useRef<HTMLDivElement>(null);
    const footerMaskRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!footerRef.current || !footerContentRef.current) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: 'top bottom',
                end: 'bottom bottom',
                scrub: 0.2,
            },
        });

        tl.fromTo(
            footerContentRef.current,
            { yPercent: 30 },
            {
                yPercent: 0,
                ease: 'none',
            }
        ).fromTo(
            footerMaskRef.current,
            { scaleY: 1 },
            {
                scaleY: 0,
                transformOrigin: 'top center',
                ease: 'none',
            },
            '<'
        );
    }, []);

    return (
        <footer
            ref={footerRef}
            className='pointer-events-none relative h-[50svh] overflow-clip'
        >
            <div
                ref={footerMaskRef}
                className='absolute inset-0 z-50 h-full w-full bg-primary'
            ></div>
            <div
                ref={footerContentRef}
                className='pointer-events-auto flex h-[50svh] w-full items-end justify-center bg-secondary text-primary'
            >
                <div className='relative mx-auto flex h-full w-full max-w-[var(--max-width)] flex-col items-start justify-end p-8'>
                    <div className='mb-40 flex h-1/2 w-full items-end justify-between rounded-huge'>
                        <Heading tag='h3' variant='display'>
                            Obsidian
                        </Heading>

                        {/* NAVLINKS */}
                        {navlinks && navlinks.length > 0 && (
                            <ul>
                                {navlinks.map((link) => (
                                    <NavLink
                                        label={link.label}
                                        variant='primary'
                                        key={link.slug}
                                        onClick={() => router.push(link.slug)}
                                    />
                                ))}
                            </ul>
                        )}

                        {/* SOCIAL LINKS */}
                        {socialLinks && socialLinks.length > 0 && (
                            <ul className='self-center'>
                                {socialLinks.map((link) => (
                                    <li key={link.label}>
                                        <ExternalLink
                                            className='underlined-link text-title-small text-primary md:text-title-medium'
                                            href={link.url}
                                            variant='primary'
                                        >
                                            {link.label}
                                        </ExternalLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* COPYRIGHT */}
                    <p>
                        © {new Date().getFullYear()} Obsidian Park. All rights
                        reserved.
                    </p>
                    <p>
                        Design & Development by{' '}
                        <ExternalLink
                            variant='primary'
                            href='https://juliscapucin.com'
                        >
                            Juli Scapucin
                        </ExternalLink>
                    </p>
                </div>
            </div>
        </footer>
    );
}
