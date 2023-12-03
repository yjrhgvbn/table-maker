import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CheckState {
	curPluginKey?: string
	curListKey?: string
	curListName?: string
	isToSave?: boolean
	updateName: (name: string) => void
}

export const useCheckState = create(
	persist<CheckState>(
		set => ({
			curListKey: '',
			curPluginKey: '',
			curListName: '',
			isToSave: false,
			updateName: (name: string) => {
				set({ curListName: name })
			}
		}),
		{
			name: 'table-check-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
export default useCheckState
