import { ColumnConfigType } from 'components/table'
import { changePlugin, useCheckState, usePluginState } from 'state'
import { PluginConfig, globalPluginCore } from './core'

export const Plugin = {
	columnType: ColumnConfigType,

	create(config: PluginConfig) {
		globalPluginCore.add(config)
		const { curPluginKey } = useCheckState.getState()
		usePluginState.getState().addPlugin(config.key)
		if (!curPluginKey || curPluginKey === config.key) {
			changePlugin(config.key)
		}
	}
}
export default Plugin
