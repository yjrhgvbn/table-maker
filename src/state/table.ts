import { globalPluginCore } from 'plugin'
import type { ColumnConfig, DsField } from 'types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface TableState {
	data: DsField[]
	columnConfigs: ColumnConfig[]
	updateData: (data: DsField[]) => void
	changeTable: (key: string) => void
}

export const useTableState = create(
	persist<TableState>(
		set => ({
			data: [],
			columnConfigs: [],
			updateData: (data: DsField[]) => {
				set({ data })
			},
			changeTable(key: string) {
				const newColumnConfigs = (globalPluginCore.execSpecify(key, 'addColumn') || []).filter(Boolean)
				set({ columnConfigs: newColumnConfigs })
			}
		}),
		{
			name: 'table-data-storage', // name of the item in the storage (must be unique)
			storage: createJSONStorage(() => localStorage) // (optional) by default, 'localStorage' is used
			// merge: (persistedState:DsState | null, currentState:DsState) => {

			//   return { ...currentState, ...persistedState };
			// },
		}
	)
)

export default useTableState
