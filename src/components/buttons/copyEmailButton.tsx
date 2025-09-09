"use client"

import { useState, useRef } from "react"

export default function CopyEmailButton() {
	const [showCopyFeedback, setShowCopyFeedback] = useState(false)
	const labelRef = useRef(null)

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText("hello@juliscapucin.com")
			.then(() => {
				setShowCopyFeedback(true)
				setTimeout(() => setShowCopyFeedback(false), 2000)
			})
			.catch((err) => {
				console.error("Failed to copy email address: ", err)
			})
	}

	return (
		<div className='relative flex flex-col items-center justify-center mt-2'>
			<div
				ref={labelRef}
				className='relative w-fit h-4 flex items-center justify-center overflow-clip'
			>
				<span
					className={`text-label-small transition-transform duration-150 ${showCopyFeedback ? "translate-x-0" : "-translate-x-full"}`}
				>
					Copied to clipboard!
				</span>
			</div>

			<button
				className='group overflow-clip h-6 cursor-pointer'
				onClick={copyToClipboard}
			>
				<div className='flex flex-col group-hover:-translate-y-1/2 transition-transform duration-200 text-label-large uppercase'>
					<span>copy email address</span>
					<span>copy email address</span>
				</div>
			</button>
		</div>
	)
}
