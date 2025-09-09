"use client";

import { animateSplitText } from "@/animations";
import { animateSplitTextVertical } from "@/lib/animations";
import { useEffect, useRef } from "react";

type LogoProps = {
   subtitle?: string;
};

export default function Logo({ subtitle }: LogoProps) {
   const subtitleRef = useRef(null);

   useEffect(() => {
      if (!subtitleRef.current) return;

      animateSplitTextVertical(subtitleRef.current, 1.4, 0.6, 1, 0.03);
   }, []);

   return (
      <div className="gsap-section-title mt-2 lg:mt-0 overflow-y-clip">
         <h1 className="logo pointer-events-none text-faded-70">MAN/ONE</h1>
         <h1 className="logo pointer-events-none text-faded-70">MUSIC</h1>
         <h2
            ref={subtitleRef}
            className="text-title-large text-balance max-w-[60%] lg:max-w-[400px] mt-2"
         >
            {subtitle}
         </h2>
      </div>
   );
}
