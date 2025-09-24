'use client';

import { CustomButton } from '@/components/ui';

type NavLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
};

export default function NavLink({ label, ...props }: NavLinkProps) {
    return (
        <div className='max-h-8 overflow-clip'>
            <CustomButton
                classes='text-title-small md:text-title-medium uppercase'
                disabled={false}
                {...props}
            >
                {label}
            </CustomButton>
        </div>
    );
}
