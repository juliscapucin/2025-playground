'use client';

import { useEffect, useState } from 'react';

import { IconChevron } from '@/components/icons';
import { ButtonToggle } from '@/components/buttons';

const themes = [
    { theme: 'light', color: 'bg-colorWhite' },
    { theme: 'dark', color: 'bg-colorBlack' },
    { theme: 'green', color: 'bg-colorGreen' },
];

function getThemeStorage() {
    return localStorage.getItem('theme') || 'dark';
}

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState<string>(getThemeStorage);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const updateTheme = (theme: string) => {
        localStorage.setItem('theme', theme);
        setTheme(theme);
    };

    // Get theme from session storage on load
    useEffect(() => {
        const storedTheme = getThemeStorage();
        setTheme(storedTheme);
    }, []);

    // Update theme in session storage on change
    useEffect(() => {
        if (!theme) return;
        updateTheme(theme);
    }, [theme]);

    useEffect(() => {
        if (theme && theme.length === 0) {
            updateTheme('dark');
        }
    }, [theme, updateTheme]);

    const handleThemeChange = (
        e: React.MouseEvent<HTMLButtonElement>,
        color: string
    ) => {
        updateTheme(color);
        toggleMenu();
        e.currentTarget.classList.add('active');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    //  Apply theme on theme change
    useEffect(() => {
        const documentDiv = document.querySelector('html');
        documentDiv?.setAttribute('data-theme', theme ? theme : 'dark');
    }, [theme]);

    return (
        <div
            className={`theme-switcher flex h-full items-center transition-transform duration-200 ${
                !isMenuOpen && `translate-x-[80px]`
            }`}
        >
            {/* Open Theme Menu */}
            <button
                className='mr-4 -mb-[3px] flex h-full items-center gap-2'
                onClick={toggleMenu}
            >
                <span
                    className={`mr-4 leading-tight transition-transform duration-200 ${
                        isMenuOpen && `translate-x-[38px]`
                    }`}
                >
                    Theme
                </span>
                {/* Active State */}
                <div
                    className={`h-6 w-6 border border-secondary ${isMenuOpen && 'opacity-0'} }`}
                ></div>
                {/* Chevron */}
                <IconChevron direction={isMenuOpen ? 'back' : 'forward'} />
            </button>
            {/* Themes buttons */}
            <div className='-mb-[3px] flex items-center gap-4'>
                {themes.map((item) => {
                    return (
                        <button
                            key={item.theme}
                            type='button'
                            className={`${item.color} ${
                                item.theme === theme && 'active'
                            } border-colorFaded h-6 w-6 border transition-transform duration-200 hover:scale-125`}
                            onClick={(e) => handleThemeChange(e, item.theme)}
                        ></button>
                    );
                })}
            </div>
        </div>
    );
}
