import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export const animateScrollTo = (
    targetElement: string,
    container?: HTMLElement | null
) => {
    gsap.registerPlugin(ScrollToPlugin);

    gsap.to(container ? container : window, {
        scrollTo: {
            y: `#${targetElement}`,
            autoKill: false,
        },
    });
};
