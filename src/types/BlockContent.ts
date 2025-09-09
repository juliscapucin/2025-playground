export type BlockContent = {
	_key: string
	_type: string
	children: Array<{
		_key: string
		_type: string
		text: string
	}>
	markDefs: any[]
	style: string
}
