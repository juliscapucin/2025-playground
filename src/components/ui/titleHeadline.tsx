"use client";

import { Heading } from "@/components/ui";

type TitleProps = {
   children: string;
   classes?: string;
   ref?: React.Ref<HTMLDivElement>;
};

export default function TitleHeadline({ children, classes, ref }: TitleProps) {
   return (
      <div
         className={`gsap-projects-title gsap-project-content mt-2 ${classes || ""}`}
         ref={ref}
      >
         <Heading
            tag={"h1"}
            classes="uppercase text-balance"
            variant="headline"
         >
            {children}
         </Heading>
      </div>
   );
}
