'use client';

import { useRouter, usePathname } from 'next/navigation';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { MenuMobile, NavLink } from '@/components/ui';
import { NavLink as NavLinkType } from '@/types';
import { ThemeToggle } from '@/components';
import { useRef, useState } from 'react';

type HeaderProps = {
    navLinks: NavLinkType[];
};

export default function Header({ navLinks }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();

    const [hovered, setHovered] = useState<string | null>(null);

    const bottomBorderRef = useRef<HTMLDivElement>(null);
    const navbarRef = useRef<HTMLElement>(null);

    const animateBottomBorder = (path: string | null) => {
        const activeLink = navLinks.find((link) => link.slug === path);
        if (activeLink && navbarRef.current) {
            const linkElement = Array.from(
                navbarRef.current.querySelectorAll('button, a')
            ).find((el) => el.textContent === activeLink.label);

            if (linkElement) {
                const linkRect = linkElement.getBoundingClientRect();
                const navbarRect = navbarRef.current.getBoundingClientRect();

                gsap.to(bottomBorderRef.current, {
                    width: `${linkRect.width}px`,
                    left: `${linkRect.left - navbarRect.left}px`,
                    duration: 0.5,
                    ease: 'power2.out',
                });
            }
        }
    };

    // Animate bottom border on route change
    useGSAP(() => {
        if (!bottomBorderRef.current) return;
        animateBottomBorder(pathname);
    }, [pathname]);

    return (
        <header className='pointer-events-none fixed top-0 right-0 left-0 z-50'>
            <MenuMobile navLinks={navLinks} />
            <nav
                ref={navbarRef}
                className='pointer-events-auto relative mx-auto h-[var(--header-height)] w-fit max-w-[var(--max-width)] items-center justify-between gap-32 overflow-clip rounded-b-2xl bg-accent px-8 py-2 transition-[background-color] duration-800 md:hidden lg:flex'
            >
                {/* NAVLINKS */}
                <ul className='gap-8 lg:flex'>
                    {/* START */}
                    <NavLink
                        label='Start'
                        variant='primary'
                        onClick={() => router.push('/')}
                        onMouseEnter={() => animateBottomBorder('/')}
                        onMouseLeave={() => animateBottomBorder(pathname)}
                        disabled={pathname === '/'}
                    />
                    {navLinks.map(
                        (link, index) =>
                            link.slug !== '/' && (
                                <NavLink
                                    label={link.label}
                                    variant='primary'
                                    key={`panel-button-${index}`}
                                    onClick={() => router.push(link.slug)}
                                    onMouseEnter={() =>
                                        animateBottomBorder(link.slug)
                                    }
                                    onMouseLeave={() =>
                                        animateBottomBorder(pathname)
                                    }
                                />
                            )
                    )}
                    {/* BOTTOM BORDER */}
                    <div
                        ref={bottomBorderRef}
                        className='pointer-events-none absolute bottom-1 left-0 z-50 h-2 w-full'
                    >
                        <div className='h-[2px] bg-secondary'></div>
                    </div>
                </ul>

                {/* THEME SWITCHER */}
                <ThemeToggle variant='toggle' />
            </nav>
        </header>
    );
}
