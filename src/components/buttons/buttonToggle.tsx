type ButtonToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    classes?: string;
    toggleState: 'on' | 'off';
};

export default function ButtonToggle({
    classes,
    toggleState,
    ...props
}: ButtonToggleProps) {
    return (
        <button
            className={`relative flex h-[18px] w-8 items-center justify-center rounded-full bg-secondary p-1 transition-colors duration-200 hover:bg-secondary/30 ${classes}`}
            {...props}
        >
            <div
                className={`absolute aspect-square h-4 rounded-full bg-primary transition-all duration-200 hover:bg-primary/30 ${toggleState === 'on' ? 'right-1' : 'left-1'}`}
            ></div>
        </button>
    );
}
