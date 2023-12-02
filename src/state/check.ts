import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface CheckState {
	curPluginKey?: string
	curListKey?: string
	curListName?: string
	updateName: (name: string) => void
}

export const useCheckState = create(
	persist<CheckState>(
		set => ({
			curListKey: '',
			curPluginKey: '',
			curListName: '',
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
