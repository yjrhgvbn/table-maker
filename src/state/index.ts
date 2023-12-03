import { debounce, isEqual } from 'lodash-es'
import { useCheckState } from './check'
import { useFormState } from './form'
import { useListState } from './list'
import { useTableState } from './table'

export function changeList(key: string) {
	const targetRow = useListState.getState().list.find(item => item.key === key)
	if (!targetRow) {
		console.warn(`changeList error: key:${key} not found`)
		return
	}
	const { name, table, plugin } = targetRow
	useCheckState.setState({ curListKey: key, curListName: name || '' })
	useFormState.getState().updateData(plugin)
	useTableState.getState().updateData(table)
}
export function changePlugin(key: string) {
	useCheckState.setState({ curPluginKey: key })
	useFormState.getState().changeForm(key)
	useTableState.getState().changeTable(key)
}

export function checkUnsaved() {
	const { curListKey, curListName, isToSave } = useCheckState.getState()
	if (!curListKey) {
		console.warn('save list error: curListKey is empty')
		return false
	}
	const { table, plugin, name } = useListState.getState().list.find(item => item.key === curListKey) || {}
	const toSavePlugin = useFormState.getState().data
	const toSaveTable = useTableState.getState().data

	if (curListName !== name || !isEqual(toSavePlugin, plugin) || !isEqual(toSaveTable, table)) {
		if (!isToSave) useCheckState.setState({ isToSave: true })
	} else if (isToSave) {
		useCheckState.setState({ isToSave: false })
	}
	return false
}
const checkUnsavedDebounce = debounce(checkUnsaved, 100)
// TODO: use singel store, wrap setState to checkUnsavedDebounce
useCheckState.subscribe(() => {
	checkUnsavedDebounce()
})
useFormState.subscribe(() => {
	checkUnsavedDebounce()
})
useTableState.subscribe(() => {
	checkUnsavedDebounce()
})
export * from './check'
export * from './form'
export * from './list'
export * from './plugin'
export * from './table'
