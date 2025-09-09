import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export const handlePanelSlide = (targetSlug: string) => {
   const targetPanel =
      targetSlug === "/"
         ? (document.querySelector("[data-id=panel-home]") as HTMLDivElement)
         : (document.querySelector(
              `[data-id=panel-${targetSlug.includes("/") ? targetSlug.split("/")[1] : targetSlug}]`,
           ) as HTMLDivElement);

   if (!targetPanel) return;

   let y = targetPanel.offsetLeft;

   gsap.to(window, {
      scrollTo: {
         y: y,
         autoKill: false,
      },
      duration: 0.5,
      onComplete: () => {
         window.history.pushState(null, "", `${targetSlug}`);
      },
   });
};
