"use client";

import { Heading } from "@/components/ui";

type TitleProps = {
   ref?: React.RefObject<HTMLDivElement | null>;
   children: string;
   classes?: string;
};

export default function TitleDisplay({ children, classes, ref }: TitleProps) {
   return (
      <div
         className={`mt-16 lg:mt-0 mb-8 lg:mb-0 pl-4 lg:pl-6 border-faded border-t pointer-events-none ${classes || ""}`}
         ref={ref}
      >
         <Heading
            tag={"h2"}
            classes="gsap-section-title whitespace-nowrap uppercase leading-0.8 lg:-mt-3 text-faded-70"
            variant="display"
         >
            {children}
         </Heading>
      </div>
   );
}
