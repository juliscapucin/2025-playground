import Link from "next/link"

type CustomLinkProps = {
	href: string
	label: string
}

export default function CustomLink({ href, label }: CustomLinkProps) {
	return (
		<Link className='custom-button-rounded' href={href} target='_blank'>
			{label}
		</Link>
	)
}
