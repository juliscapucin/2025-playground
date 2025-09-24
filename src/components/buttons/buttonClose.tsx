import { IconClose } from '@/components/icons';

type ButtonCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    classes?: string;
};

export default function ButtonClose({ classes, ...props }: ButtonCloseProps) {
    return (
        <button
            className={`relative h-12 w-12 ${classes || ''}`}
            aria-label='close menu'
            {...props}
        >
            <IconClose />
        </button>
    );
}
