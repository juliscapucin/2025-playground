import { Heading } from '@/components/ui';

type DefaultPageProps = {
    title: string;
    children?: React.ReactNode;
};

export default function DefaultPage({ title, children }: DefaultPageProps) {
    return (
        <main className='mt-[var(--header-height)] min-h-[calc(100vh-var(--header-height)-var(--footer-height))] px-4 pt-8 pb-16 md:px-8 lg:px-16'>
            <Heading tag='h1' variant='display' classes='mb-8'>
                {title}
            </Heading>
            {children}
        </main>
    );
}
