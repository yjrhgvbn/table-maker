import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import { FormState } from './form'
import { createSlice } from './middleware'
import { TableState } from './table'

interface ListState {
	list: {
		key: string
		name: string
		updateTime: number
		table: TableState['tableData']
		plugin: FormState['formData']
	}[]
	/** add new row */
	create: () => void
	/**
	 * save table and plugin data
	 * @param key default useCheckState.curListKey then nanoid
	 * @param table default useTableState.data then []
	 * @param plugin default useFormState.data then {}
	 * @returns
	 */
	save: (paramete?: { key?: string; name?: string; table?: TableState['tableData']; plugin?: FormState['formData'] }) => void
	delete: (key: string) => void
	getDate: (key?: string) => ListState['list'][0] | undefined
}
declare module 'state/middleware/type' {
	interface StateMutators {
		ListState: ListState
	}
}

createSlice<ListState>((set, get) => ({
	list: [],
	create: () => {
		const key = nanoid()
		set({ list: [{ key, name: `未命名${get().list.length + 1}`, table: [], plugin: {}, updateTime: Date.now() }, ...get().list] })
		// changeList(key)
	},
	save: (parameter = {}) => {
		const { key: keyParameter, name: nameParameter, table: tableParameter, plugin: pluginParameter } = parameter
		const { curListKey, tableData, formData, curListName } = get()
		const key = keyParameter || curListKey || nanoid()
		const table = tableParameter || tableData || []
		const plugin = pluginParameter || formData || {}
		const name = nameParameter || curListName || `未命名${get().list.length + 1}`
		const { list } = get()
		const index = list.findIndex(item => item.key === key)
		const newListItem = { name, key, table: cloneDeep(table), plugin: cloneDeep(plugin), updateTime: Date.now() }
		if (index === -1) {
			list.push(newListItem)
		} else {
			list[index] = newListItem
		}
		set({ list: [...list] })
		// useCheckState.setState({ isToSave: false })
	},
	delete: (key: string) => {
		const { list } = get()
		const index = list.findIndex(item => item.key === key)
		if (index === -1) {
			console.warn(`delete list error: key:${key} not found`)
			return
		}
		list.splice(index, 1)
		set({ list })
	},
	getDate: (key?: string) => {
		const defaultKey = key || get().curListKey
		const { list } = get()
		const index = list.findIndex(item => item.key === defaultKey)
		if (index >= 0) {
			return list[index]
		}
		return undefined
	}
}))
