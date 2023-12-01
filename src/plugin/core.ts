import { ColumnConfig, DsField } from 'components/table'
import { FormItemConfig, FormValue } from 'state/form'

export interface PluginConfig {
	name?: string
	key: string
	addColumn?: () => ColumnConfig[]
	addFormItem?: () => FormItemConfig[]
	parseOutput?: (data: DsField[], formData: FormValue) => string
}

type RequiredPluginConfig = Required<PluginConfig>
// 获取 PluginConfig 函数方法的key，排查基本类型
type PluginConfigExecKey = {
	[K in keyof RequiredPluginConfig]: RequiredPluginConfig[K] extends (...argument: any[]) => any ? K : never
}[keyof RequiredPluginConfig]

class PluginCore {
	/** current use plugin key */
	curPluginKey?: string = ''

	/** plugin map */
	pluginMap = new Map<string, PluginConfig>()

	exec<K extends PluginConfigExecKey>(pluginKey: K, ...argument: Parameters<RequiredPluginConfig[K]>) {
		return this.execSpecify(this.curPluginKey, pluginKey, ...argument)
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
		if (this.curPluginKey) this.curPluginKey = config.key
		this.pluginMap.set(config.key, config)
	}

	change(key: string) {
		if (!this.pluginMap.has(key)) {
			console.warn(`PluginCore: plugin ${key} is not exist`)
		}
		this.curPluginKey = key
	}
}
export const globalPluginCore = new PluginCore()

export default globalPluginCore
