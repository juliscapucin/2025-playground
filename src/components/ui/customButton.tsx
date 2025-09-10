'use client';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    slug?: string;
    classes?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    transitionOnClick: (slug: string) => void;
};

const CustomButton = ({
    slug,
    classes,
    style,
    children,
    transitionOnClick,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`underlined-link pointer-events-auto ${classes || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default CustomButton;
