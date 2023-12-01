import type { ColumnConfig, DsField } from 'components/table'
import { globalPluginCore } from 'plugin'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface DsState {
	dataMap: Record<string, DsField[]>
	data: DsField[]
	columnConfigs: ColumnConfig[]
	updateData: (data: DsField[]) => void
	changeTable: (key: string) => void
}

export const useDsState = create(
	persist<DsState>(
		set => ({
			dataMap: {},
			data: [],
			columnConfigs: [],
			updateData: (data: DsField[]) => {
				set({ data })
			},
			changeTable(key: string) {
				const newColumnConfigs = (globalPluginCore.execSpecify(key, 'addColumn') || []).filter(Boolean)
				set({ data: this.dataMap[key] || [], columnConfigs: newColumnConfigs })
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

export default useDsState
