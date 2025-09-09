'use client';

type SectionWrapperProps = {
    children: React.ReactNode;
    classes?: string;
    ref?: React.Ref<HTMLDivElement>;
    isIntro?: boolean;
};

export default function SectionWrapper({
    children,
    classes,
    ref,
    isIntro,
}: SectionWrapperProps) {
    return (
        <div
            ref={ref}
            className='section-wrapper border-faded relative w-screen min-w-[95vw] items-center justify-between overflow-x-clip px-0 pt-16 pb-8 lg:flex lg:min-h-svh lg:w-fit lg:overflow-clip lg:border lg:pt-0'
        >
            <div className={`bg-primary ${classes || ''}`}>{children}</div>
        </div>
    );
}
