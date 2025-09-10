type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    classes?: string;
    children: React.ReactNode;
    variant: 'display' | 'headline' | 'title';
    font?: 'primary' | 'secondary';
};

export default function Heading({
    tag,
    classes,
    children,
    variant,
    font,
    ...props
}: HeadingProps) {
    const Tag = tag;
    let headingStyles = '';

    switch (variant) {
        case 'display':
            headingStyles =
                'text-display-small md:text-display-medium lg:text-display-large font-medium';
            break;
        case 'headline':
            headingStyles =
                'text-headline-small md:text-headline-medium lg:text-headline-large font-medium';
            break;
        case 'title':
            headingStyles =
                'text-title-small md:text-title-medium lg:text-title-large';
            break;
        default:
            headingStyles =
                'text-display-small md:text-display-medium lg:text-display-large';
            break;
    }

    return (
        <Tag
            className={`${
                classes ? classes : ''
            } ${headingStyles} ${font ? `font-${font}` : 'font-primary'} leading-none font-extralight tracking-tight`}
            {...props}
        >
            {children}
        </Tag>
    );
}
