import type { DsField } from 'components/table'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface DsState {
	data: DsField[]
	updateData: (data: DsField[]) => void
}

export const useDsState = create(
	persist<DsState>(
		set => ({
			data: [],
			updateData: (data: DsField[]) => {
				set({ data })
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
