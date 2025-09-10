'use client';

import { usePathname } from 'next/navigation';

import { CustomButton, MenuMobile, NavLink } from '@/components/ui';
import { NavLink as NavLinkType } from '@/types';

type HeaderProps = {
    navLinks: NavLinkType[];
};

export default function Header({ navLinks }: HeaderProps) {
    const pathname = usePathname();

    return (
        <header className='fixed top-0 right-0 left-0 z-50'>
            <MenuMobile navLinks={navLinks} />
            <nav className='h-16 justify-between overflow-clip border-b bg-primary px-8 py-4 md:hidden lg:flex'>
                {/* LOGO */}
                <CustomButton
                    slug='/'
                    classes={`underlined-link text-title-small md:text-title-medium uppercase transition-transform ${pathname === '/' ? '-translate-x-[150%]' : 'translate-x-0'}`}
                    transitionOnClick={() =>
                        console.log('add page transition animation')
                    }
                >
                    MAN/ONE MUSIC
                </CustomButton>

                {/* NAVLINKS */}
                <div className='gap-8 lg:flex'>
                    {navLinks.map(
                        (link, index) =>
                            link.slug !== '/' && (
                                <NavLink
                                    label={link.label}
                                    slug={link.slug}
                                    key={`panel-button-${index}`}
                                    action={() => console.log('action')}
                                />
                            )
                    )}
                </div>
            </nav>
        </header>
    );
}
