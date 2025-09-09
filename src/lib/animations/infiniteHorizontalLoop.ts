import { gsap } from "gsap"

interface LoopConfig {
	paddingRight?: string
	reversed?: any
	snap?: number | number[] | boolean
	speed?: number
	repeat?: number
	paused?: boolean
	center?: boolean
	inertia?: boolean
	enterAnimation?: (
		item: any,
		maxDuration: number,
		index: number
	) => GSAPAnimation
	leaveAnimation?: (
		item: any,
		maxDuration: number,
		index: number
	) => GSAPAnimation
}

export function infiniteHorizontalLoop(
	items: HTMLElement[],
	config: LoopConfig
) {
	items = gsap.utils.toArray(items)

	let tl = gsap.timeline({
			repeat: config.repeat,
			paused: config.paused,
			defaults: { ease: "none" },
			onReverseComplete: (): void => {
				tl.totalTime(tl.rawTime() + tl.duration() * 100)
			},
		}),
		length = items.length,
		startX = items[0].offsetLeft,
		times: any[] = [],
		widths: number[] = [],
		xPercents: any[] = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		paddingRight = config.paddingRight || "0",
		// snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		snap =
			config.snap === false
				? (v: number) => v
				: gsap.utils.snap(
						typeof config.snap === "number" || Array.isArray(config.snap)
							? config.snap
							: 1
					),
		totalWidth,
		curX,
		distanceToStart,
		distanceToLoop,
		item,
		i
	gsap.set(items, {
		// convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
		xPercent: (i, el) => {
			let w = (widths[i] = parseFloat(
				gsap.getProperty(el, "width", "px").toString()
			))
			xPercents[i] = snap(
				(parseFloat(gsap.getProperty(el, "x", "px").toString()) / w) * 100 +
					parseFloat(gsap.getProperty(el, "xPercent") as string)
			).toString()
			return xPercents[i]
		},
	})
	gsap.set(items, { x: 0 })
	totalWidth =
		items[length - 1].offsetLeft +
		(xPercents[length - 1] / 100) * widths[length - 1] -
		startX +
		items[length - 1].offsetWidth *
			Number(gsap.getProperty(items[length - 1], "scaleX")) +
		(parseFloat(paddingRight) || 0)
	for (i = 0; i < length; i++) {
		item = items[i]
		curX = (xPercents[i] / 100) * widths[i]
		distanceToStart = item.offsetLeft + curX - startX
		distanceToLoop =
			distanceToStart + widths[i] * Number(gsap.getProperty(item, "scaleX"))
		tl.to(
			item,
			{
				xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
				duration: distanceToLoop / pixelsPerSecond,
			},
			0
		)
			.fromTo(
				item,
				{
					xPercent: snap(
						((curX - distanceToLoop + totalWidth) / widths[i]) * 100
					),
				},
				{
					xPercent: xPercents[i],
					duration:
						(curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
					immediateRender: false,
				},
				distanceToLoop / pixelsPerSecond
			)
			.add("label" + i, distanceToStart / pixelsPerSecond)
		times[i] = distanceToStart / pixelsPerSecond
	}
	function toIndex(index: number, vars: gsap.TweenVars | undefined) {
		vars = vars || {}
		Math.abs(index - curIndex) > length / 2 &&
			(index += index > curIndex ? -length : length) // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex]
		if (time > tl.time() !== index > curIndex) {
			// if we're wrapping the timeline's playhead, make the proper adjustments
			vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
			time += tl.duration() * (index > curIndex ? 1 : -1)
		}
		curIndex = newIndex
		vars.overwrite = true

		return tl.tweenTo(time, vars)
	}

	// needs var values ex: { duration: 0.3, ease: "power1.inOut" } to work
	tl.next = (vars: gsap.TweenVars | undefined) => {
		toIndex(curIndex + 1, vars)
	}
	tl.previous = (vars: gsap.TweenVars | undefined) =>
		toIndex(curIndex - 1, vars)
	tl.current = () => curIndex
	tl.onChange = () => {
		// Create a listener that updates whenever the timeline progresses
		tl.eventCallback("onUpdate", () => {
			// Calculate the current index based on timeline progress
			const progress = tl.progress()
			const normalizedTime = tl.duration() * progress
			const newIndex = times.findIndex((time, i, arr) => {
				const nextTime = arr[i + 1] || tl.duration()
				return normalizedTime >= time && normalizedTime < nextTime
			})

			if (newIndex !== -1 && newIndex !== curIndex) {
				curIndex = newIndex
			}
		})

		return curIndex
		// return tl // For chaining
	}
	tl.toIndex = (index: number, vars: gsap.TweenVars | undefined) =>
		toIndex(index, vars)
	tl.times = times
	tl.progress(1, true).progress(0, true) // pre-render for performance

	if (config.reversed && tl.vars.onReverseComplete) {
		tl.vars.onReverseComplete()
		tl.reverse()
	}
	return tl
}
