import { ColumnConfigType } from 'components/table'
import { globalPluginCore, PluginConfig } from './core'

export const Plugin = {
	columnType: ColumnConfigType,

	create(config: PluginConfig) {
		globalPluginCore.add(config)
	}
}
export default Plugin
