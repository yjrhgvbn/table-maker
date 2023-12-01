import { ColumnConfigType } from 'components/table'
import usePluginState from 'state/plugin'
import { globalPluginCore, PluginConfig } from './core'

export const Plugin = {
	columnType: ColumnConfigType,

	create(config: PluginConfig) {
		globalPluginCore.add(config)
		const { curPluginKey } = usePluginState.getState()
		if (!curPluginKey || curPluginKey === config.key) {
			usePluginState.getState().changePlugin(config.key)
		}
	}
}
export default Plugin
