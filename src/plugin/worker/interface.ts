import { FormItemConfig } from 'plugin/interface'
import { FormValue } from 'state'
import { ColumnConfig, DsField } from 'types'

export type ActionKeys = 'addColumn' | 'addFormItem' | 'parseImport' | 'parseOutput' | 'getPluginList' | 'getPluginConfig'

type PromiseOrNot<T> = T | Promise<T>
export type AddColumnType = () => PromiseOrNot<ColumnConfig[]>
export type AddFormItemType = () => PromiseOrNot<FormItemConfig[]>
export type ParseImportType = (data: string) => PromiseOrNot<DsField[]>
export type PareOutputType = (data: DsField[], formData: FormValue) => PromiseOrNot<string>
export interface PluginConfig {
	name: string
	key: string
	addColumn?: AddColumnType
	addFormItem?: AddFormItemType
	parseImport?: ParseImportType
	parseOutput?: PareOutputType
}
