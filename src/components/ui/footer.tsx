'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
    const pathname = usePathname();

    const footerContainerRef = useRef<HTMLElement>(null);
    const footerContentRef = useRef<HTMLDivElement>(null);
    const footerMaskRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (
            !pathname ||
            !footerContainerRef.current ||
            !footerContentRef.current ||
            !footerMaskRef.current
        )
            return;

        ScrollTrigger.getById('footer')?.kill();
        gsap.killTweensOf(footerMaskRef.current);

        setTimeout(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'footer',
                    trigger: footerContainerRef.current,
                    start: 'top bottom',
                    end: 'bottom bottom',
                    scrub: 0,
                    // markers: true,
                },
            });

            tl.fromTo(
                footerMaskRef.current,
                { scaleY: 1, transformOrigin: 'top' },
                {
                    scaleY: 0,
                    ease: 'none',
                }
            ).fromTo(
                footerContentRef.current,
                { yPercent: -50 },
                { yPercent: 0, ease: 'none' },
                0 // start at the same time as previous tween
            );
        }, 500); // Delay to ensure ScrollTrigger is properly reset

        return () => {
            ScrollTrigger.getById('footer')?.kill();
            gsap.killTweensOf(footerMaskRef.current);
        };
    }, [pathname]);

    return (
        <footer
            ref={footerContainerRef}
            className='relative block h-[700px] overflow-clip pb-8'
        >
            {/* MASK */}
            <div
                ref={footerMaskRef}
                className='absolute -top-2 z-150 h-full w-full bg-primary'
            ></div>

            {/* CONTENT */}
            <div
                ref={footerContentRef}
                className='h-full w-full bg-secondary text-primary'
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
