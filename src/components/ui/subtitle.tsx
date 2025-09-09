"use client";

import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const animateSubtitle = (element: HTMLParagraphElement, duration: number) => {
   const tl = gsap.timeline();
   tl.fromTo(
      element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: duration / 1000 },
   );
   return tl;
};

type SubtitleProps = {
   subtitle: string;
};

export default function Subtitle({ subtitle }: SubtitleProps) {
   const subtitleRef = useRef<HTMLParagraphElement | null>(null);
   const ctx = gsap.context(() => {});

   // useLayoutEffect(() => {
   // 	if (!subtitleRef.current) return

   // 	gsap.registerPlugin(ScrollTrigger)

   // 	const element = subtitleRef.current as HTMLParagraphElement
   // 	const parentElement = element.closest("section") as HTMLDivElement

   // 	const offsetLeft = () => parentElement!.offsetLeft
   // 	const width = () => parentElement!.offsetWidth

   // 	let fastScrollEnd = true

   // 	ctx.add(() => {
   // 		ScrollTrigger.create({
   // 			trigger: element,
   // 			start: () => `${offsetLeft()}px bottom`,
   // 			end: () => `+=${width()}`,
   // 			invalidateOnRefresh: true,
   // 			animation: animateSubtitle(element, 300),
   // 			toggleActions: "play none none reverse",
   // 			fastScrollEnd: fastScrollEnd,
   // 			// markers: true,
   // 			onUpdate: (self) => {
   // 				// define fastScrollEnd depending on scroll direction
   // 				self.direction === 1
   // 					? (fastScrollEnd = true)
   // 					: (fastScrollEnd = false)
   // 			},
   // 		})
   // 	})

   // 	return () => ctx.revert()
   // }, [])
   return (
      <p className="block mb-8 max-w-prose" ref={subtitleRef}>
         {subtitle}
      </p>
   );
}
