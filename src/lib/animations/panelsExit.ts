import gsap from "gsap"

export const panelsExit = (routerAction: () => void) => {
	const tl = gsap.timeline({ ease: "power4.out" })
	tl.to(".gsap-panels-container", {
		opacity: 0,
		yPercent: -50,
		duration: 0.3,
		onComplete: routerAction,
	})
}
