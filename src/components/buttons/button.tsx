type ButtonProps = {
	children: React.ReactNode
	action?: () => void
	classes?: string
}

export default function Button({ children, action, classes }: ButtonProps) {
	return (
		<button className={`${classes || ""}`} onClick={action}>
			{children}
		</button>
	)
}
