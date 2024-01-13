// import { debounce, isEqual } from 'lodash-es'
import { messageManager } from 'plugin'
import { createStore } from './middleware'

import.meta.glob(['./*.ts', '!./index.ts'], { eager: true })
// export function checkUnsaved() {
// 	const { curListKey, curListName, isToSave } = useCheckState.getState()
// 	if (!curListKey) {
// 		console.warn('save list error: curListKey is empty')
// 		return false
// 	}
// 	const { table, plugin, name } = useListState.getState().list.find(item => item.key === curListKey) || {}
// 	const toSavePlugin = useFormState.getState().data
// 	const toSaveTable = useTableState.getState().data

// 	if (curListName !== name || !isEqual(toSavePlugin, plugin) || !isEqual(toSaveTable, table)) {
// 		if (!isToSave) useCheckState.setState({ isToSave: true })
// 	} else if (isToSave) {
// 		useCheckState.setState({ isToSave: false })
// 	}
// 	return false
// }
// const checkUnsavedDebounce = debounce(checkUnsaved, 100)
// // TODO: use singel store, wrap setState to checkUnsavedDebounce
// useCheckState.subscribe(() => {
// 	checkUnsavedDebounce()
// })
// useFormState.subscribe(() => {
// 	checkUnsavedDebounce()
// })
// useTableState.subscribe(() => {
// 	checkUnsavedDebounce()
// })
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
