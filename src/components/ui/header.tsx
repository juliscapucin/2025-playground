'use client';

import { useRouter, usePathname } from 'next/navigation';

import { MenuMobile, NavLink } from '@/components/ui';
import { NavLink as NavLinkType } from '@/types';
import { ThemeToggle } from '@/components';

type HeaderProps = {
    navLinks: NavLinkType[];
};

export default function Header({ navLinks }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header className='pointer-events-none fixed top-0 right-0 left-0 z-50'>
            <MenuMobile navLinks={navLinks} />
            <nav className='pointer-events-auto mx-auto h-[var(--header-height)] w-fit max-w-[var(--max-width)] items-center justify-between gap-32 overflow-clip rounded-b-2xl bg-accent px-8 py-2 transition-[background-color] duration-800 md:hidden lg:flex'>
                {/* START */}
                <NavLink
                    label='Start'
                    variant='secondary'
                    onClick={() => router.push('/')}
                    disabled={pathname === '/'}
                />

                {/* NAVLINKS */}
                <ul className='gap-8 lg:flex'>
                    {navLinks.map(
                        (link, index) =>
                            link.slug !== '/' && (
                                <NavLink
                                    label={link.label}
                                    variant='secondary'
                                    key={`panel-button-${index}`}
                                    onClick={() => router.push(link.slug)}
                                />
                            )
                    )}
                </ul>

                {/* THEME SWITCHER */}
                <ThemeToggle variant='toggle' />
            </nav>
        </header>
    );
}
