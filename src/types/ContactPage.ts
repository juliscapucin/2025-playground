export type ContactPage = {
	title: string
	subtitle?: string
	email: string
	socials: [
		{
			platform: string
			link: string
		},
	]
	love: [
		{
			platform: string
			link: string
		},
	]
	metadataTitle: string
	metadataDescription: string
	metadataKeywords: string[]
}
