'use client';

import { usePathname } from 'next/navigation';

import { CustomButton } from '@/components/ui';

type NavLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
    variant: 'primary' | 'secondary';
};

export default function NavLink({ label, variant, ...props }: NavLinkProps) {
    const pathname = usePathname();

    return (
        <li className='max-h-8 overflow-clip'>
            <CustomButton
                classes={`underlined-link text-title-small md:text-title-medium disabled:pointer-events-none text-${variant} disabled:opacity-50`}
                disabled={pathname.includes(label.toLowerCase())}
                {...props}
            >
                {label}
            </CustomButton>
        </li>
    );
}
