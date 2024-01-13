import type { ColumnConfig, DsField } from 'types'
import { createSlice } from './middleware'

export interface TableState {
	tableData: DsField[]
	columnConfigs: ColumnConfig[]
	updateData: (data: DsField[]) => void
	changeTable: (key: string) => void
}

declare module 'state/middleware/type' {
	interface StateMutators {
		TableState: TableState
	}
}

createSlice<TableState>(set => ({
	tableData: [],
	columnConfigs: [],
	updateData: (data: DsField[]) => {
		set({ tableData: data })
	},
	changeTable(key: string) {
		// const newColumnConfigs = (globalPluginCore.execSpecify(key, 'addColumn') || []).filter(Boolean)
		// set({ columnConfigs: newColumnConfigs })
	}
}))
