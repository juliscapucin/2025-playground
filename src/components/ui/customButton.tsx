'use client';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    classes?: string;
    children?: React.ReactNode;
};

const CustomButton = ({ classes, style, children, ...props }: ButtonProps) => {
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
