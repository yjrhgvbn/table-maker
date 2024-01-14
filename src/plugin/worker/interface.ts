import { ColumnConfig, DsField, FormValue } from 'state/interface'
import { FormItemConfig } from '../interface'

export type ActionKeys = 'addColumn' | 'addFormItem' | 'parseImport' | 'parseOutput' | 'getPluginList' | 'loadPresetPlugin'

export type ActionParameters<K> = K extends PluginConfigExecKey ? { pluginKey: string; params?: Parameters<RequiredCostomPluginFunction[K]> } : any

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

export class CostomPlugin {
	key: string

	name: string

	addColumn?: AddColumnType

	addFormItem?: AddFormItemType

	parseImport?: ParseImportType

	parseOutput?: PareOutputType

	constructor(config: PluginConfig) {
		if (!config.key) throw new Error('PluginConfig.key is required')
		if (!config.name) throw new Error('PluginConfig.name is required')
		this.key = config.key
		this.name = config.name
		this.addColumn = config.addColumn
		this.addFormItem = config.addFormItem
		this.parseImport = config.parseImport
		this.parseOutput = config.parseOutput
	}
}
// 获取 CostomPlugin中所有 函数方法的名称，排查基本类型
export type RequiredCostomPluginFunction = Required<CostomPlugin>
export type PluginConfigExecKey = {
	[K in keyof RequiredCostomPluginFunction]: RequiredCostomPluginFunction[K] extends (...argument: any[]) => any ? K : never
}[keyof RequiredCostomPluginFunction]
