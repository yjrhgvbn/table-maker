export type FormItemValue = string | number | boolean
export type FormValue = Record<string, FormItemValue>
export type DsFieldExtend = Record<string, boolean | string | undefined>

// ColumnConfigType 映射string或者boolean
type ColumnConfigTypeMap<T extends ColumnConfigType> = T extends ColumnConfigType.Switch ? boolean : string

export type DsField<K extends string = string, T extends ColumnConfigType = ColumnConfigType> = {
	/** 扩展 */
	[KEy in K]?: ColumnConfigTypeMap<T>
} & {
	id: string
}

export enum ColumnConfigType {
	String = 'string',
	Select = 'select',
	Switch = 'switch'
}

export interface ColumnConfig {
	key: string
	header: string
	type?: ColumnConfigType
	options?: string[]
}
