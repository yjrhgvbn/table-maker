import { useStore } from 'state'
import { FormValue } from 'state/form'
import { ColumnConfig, DsField, FormItemConfig } from 'types'

export interface PluginConfig {
	name?: string
	key: string
	addColumn?: () => ColumnConfig[]
	addFormItem?: () => FormItemConfig[]
	parseImport?: (data: string) => DsField[]
	parseOutput?: (data: DsField[], formData: FormValue) => string
}

type RequiredPluginConfig = Required<PluginConfig>
// 获取 PluginConfig 函数方法的key，排查基本类型
type PluginConfigExecKey = {
	[K in keyof RequiredPluginConfig]: RequiredPluginConfig[K] extends (...argument: any[]) => any ? K : never
}[keyof RequiredPluginConfig]

class PluginCore {
	/** plugin map */
	pluginMap = new Map<string, PluginConfig>()

	exec<K extends PluginConfigExecKey>(pluginKey: K, ...argument: Parameters<RequiredPluginConfig[K]>) {
		return this.execSpecify(useStore.getState().curPluginKey, pluginKey, ...argument)
	}

	execSpecify<K extends PluginConfigExecKey>(
		key?: string,
		pluginKey?: K,
		...argument: Parameters<RequiredPluginConfig[K]>
	): ReturnType<RequiredPluginConfig[K]> | undefined {
		if (!key) return undefined
		const plugin = this.pluginMap.get(key)
		if (!plugin) return undefined
		// @ts-expect-error 函数内忽略复杂类型
		const result = plugin[pluginKey]?.(...argument)
		return result as any
	}

	add(config: PluginConfig) {
		if (!config.key) {
			throw new Error('PluginConfig.key is required')
		}
		this.pluginMap.set(config.key, config)
	}
}
export const globalPluginCore = new PluginCore()

export default globalPluginCore
