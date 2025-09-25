import { Heading } from '@/components/ui';

type PageWrapperProps = {
    children?: React.ReactNode;
};

export default function PageWrapper({ children }: PageWrapperProps) {
    return (
        <main className='mx-auto mt-[var(--header-height)] max-w-[var(--max-width)] bg-primary px-4 pt-8 pb-16 md:px-8 lg:px-16'>
            {children}
        </main>
    );
}
