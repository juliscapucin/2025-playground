type SubtitleProps = React.HTMLAttributes<HTMLHeadingElement> & {
    tag: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    classes?: string;
    font?: 'primary' | 'secondary';
    children: React.ReactNode;
};

export default function Subtitle({
    tag,
    classes,
    children,
    font,
    ...props
}: SubtitleProps) {
    const Tag = tag;
    return (
        <Tag
            className={`mb-8 block max-w-prose text-title-small md:text-title-medium lg:text-title-large ${font ? `font-${font}` : ''} ${classes ? classes : ''} leading-snug font-light`}
            {...props}
        >
            {children}
        </Tag>
    );
}
