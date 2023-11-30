// enum PluginType {

import { ColumnConfig } from 'components/table'

// }
export interface PluginConfig {
	name?: string
	key?: string
	addColumn?: () => ColumnConfig[]
	addFormItem?: () => void
	parseOutput?: () => string
}

type RequiredPluginConfig = Required<PluginConfig>
// 获取 PluginConfig 函数方法的key，排查基本类型
type PluginConfigExecKey = {
	[K in keyof RequiredPluginConfig]: RequiredPluginConfig[K] extends (...argument: any[]) => any ? K : never
}[keyof RequiredPluginConfig]

class PluginCore {
	plugins: PluginConfig[] = []

	exec<K extends PluginConfigExecKey>(key: K, ...argument: Parameters<RequiredPluginConfig[K]>): (ReturnType<RequiredPluginConfig[K]> | undefined)[] {
		// @ts-expect-error 函数内忽略复杂类型
		const result = this.plugins.map(plugin => plugin[key]?.(...argument))
		return result as any
	}

	add(config: PluginConfig) {
		this.plugins.push(config)
	}
}
export const globalPluginCore = new PluginCore()
export default globalPluginCore
