import { AddColumnType, AddFormItemType, PareOutputType, ParseImportType, PluginConfig } from './interface'

const pluginMap = new Map<string, CostomPlugin>()

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

export function addPlugin(config: PluginConfig) {
	try {
		if (!config.key) {
			throw new Error('PluginConfig.key is required')
		}
		pluginMap.set(config.key, new CostomPlugin(config))
	} catch (error) {
		console.error(error)
	}
}

// 获取 CostomPlugin中所有 函数方法的名称，排查基本类型
type RequiredCostomPluginFunction = Required<CostomPlugin>
type PluginConfigExecKey = {
	[K in keyof RequiredCostomPluginFunction]: RequiredCostomPluginFunction[K] extends (...argument: any[]) => any ? K : never
}[keyof RequiredCostomPluginFunction]

export function execPlugin<K extends PluginConfigExecKey>(pluginKey: string, eventName: K, ...argument: Parameters<RequiredCostomPluginFunction[K]>) {
	if (!pluginKey) return null
	const plugin = pluginMap.get(pluginKey)
	if (!plugin) return null
	// @ts-expect-error 无法确定类型
	return plugin[eventName]?.(...argument)
}

export function getPluginList() {
	return [...pluginMap.values()].map(plugin => ({ key: plugin.key, name: plugin.name }))
}
