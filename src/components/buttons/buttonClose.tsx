import { IconClose } from "@/components/icons";

type ButtonCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
   classes?: string;
};

export default function ButtonClose({ classes, ...props }: ButtonCloseProps) {
   const { onClick } = props;
   return (
      <button
         onClick={onClick}
         className={`h-12 w-12 relative ${classes || ""}`}
         aria-label="close menu"
      >
         <IconClose />
      </button>
   );
}
