import { changePlugin, useCheckState, usePluginState } from 'state'
import { ColumnConfigType, FormItemConfigType } from 'types'
import { PluginConfig, globalPluginCore } from './core'

export const Plugin = {
	columnType: ColumnConfigType,
	formItemConfigType: FormItemConfigType,

	create(config: PluginConfig) {
		globalPluginCore.add(config)
		const { curPluginKey } = useCheckState.getState()
		usePluginState.getState().addPlugin(config.key)
		if (!curPluginKey || curPluginKey === config.key) {
			changePlugin(config.key)
		}
	}
}
declare global {
	interface Window {
		__table_plugin__: typeof Plugin
	}
}
// eslint-disable-next-line no-underscore-dangle
window.__table_plugin__ = Plugin
export default Plugin
