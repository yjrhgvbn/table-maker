// import { debounce, isEqual } from 'lodash-es'
import messageManager from 'plugin/worker/messageManager'
import { createStore } from './middleware'

import.meta.glob(['./*.ts', '!./index.ts'], { eager: true })

export const useStore = createStore()
export function changePlugin(key: string) {
	useStore.setState({ curPluginKey: key })
}
export function changeList(key: string) {
	const targetRow = useStore.getState().list.find(item => item.key === key)
	if (!targetRow) {
		console.warn(`changeList error: key:${key} not found`)
		return
	}
	const { name, table, plugin } = targetRow
	useStore.setState({ curListKey: key, curListName: name || '' })
	useStore.getState().updateData(plugin)
	useStore.getState().updateData(table)
}
messageManager.send('getPluginList', {}, { timeout: 0 }).on(response => {
	useStore.getState().setPluginList(response || [])
})

export * from './form'
