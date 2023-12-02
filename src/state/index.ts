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
}

export * from './check'
export * from './form'
export * from './list'
export * from './plugin'
export * from './table'
