import { CostomPlugin, type PluginConfig, type PluginConfigExecKey, type RequiredCostomPluginFunction } from './interface'

const pluginMap = new Map<string, CostomPlugin>()

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

export function execPlugin<K extends PluginConfigExecKey>(pluginKey: string, eventName: K, ...argument: Parameters<RequiredCostomPluginFunction[K]>) {
	if (!pluginKey) return null
	const plugin = pluginMap.get(pluginKey)
	console.log('🚀 ~ plugin:', plugin)
	if (!plugin) return null
	// @ts-expect-error 无法确定类型
	return plugin[eventName]?.(...argument)
}

export function getPluginList() {
	return [...pluginMap.values()].map(plugin => ({ key: plugin.key, name: plugin.name }))
}
