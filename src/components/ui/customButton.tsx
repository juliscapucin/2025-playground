"use client"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	link?: string
	classes?: string
	style?: React.CSSProperties
	children?: React.ReactNode
	transitionOnClick: (slug: string) => void
}

const CustomButton = ({
	link,
	classes,
	style,
	children,
	transitionOnClick,
	...props
}: ButtonProps) => {
	const { onMouseEnter, onMouseLeave, disabled } = props

	const slug =
		link && link.length > 0
			? link.startsWith("/")
				? link.slice(1)
				: link
			: "/"

	return (
		<button
			className={`${classes || ""} ${disabled ? "button-active" : ""}`}
			style={style}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onClick={(e) => {
				if (!disabled) {
					e.preventDefault()
					transitionOnClick(slug)
				}
			}}
			disabled={disabled}>
			{children}
		</button>
	)
}

// Set displayName for better debugging and error messages
CustomButton.displayName = "Button"

export default CustomButton
