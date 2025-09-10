'use client';

import { CustomButton } from '@/components/ui';

interface NavLinkProps {
    label: string;
    slug: string;
    action: () => void;
}

export default function NavLink({ label, slug, action }: NavLinkProps) {
    return (
        <div className='max-h-8 overflow-clip'>
            <CustomButton
                slug={slug}
                classes='text-title-small md:text-title-medium uppercase'
                transitionOnClick={action}
                disabled={false}
            >
                {label}
            </CustomButton>
        </div>
    );
}
