export enum FormItemConfigType {
	String = 'string',
	Select = 'select',
	Switch = 'switch'
}

export interface FormItemConfig {
	key?: string
	label?: string
	type?: FormItemConfigType
}
