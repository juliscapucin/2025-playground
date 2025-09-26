'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/buttons';
import { MenuMobile, NavLink } from '@/components/ui';
import { NavLink as NavLinkType } from '@/types';
import { ThemeToggle } from '@/components';

type HeaderProps = {
    navLinks: NavLinkType[];
};

export default function Header({ navLinks }: HeaderProps) {
    const router = useRouter();

    return (
        <header className='pointer-events-none fixed top-0 right-0 left-0 z-50'>
            <MenuMobile navLinks={navLinks} />
            <nav className='pointer-events-auto mx-auto h-16 max-w-[var(--max-width)] justify-between overflow-clip bg-primary px-8 py-4 transition-[background-color] duration-800 md:hidden lg:flex'>
                {/* LOGO */}
                <Button onClick={() => router.push('/')}>Home</Button>

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
