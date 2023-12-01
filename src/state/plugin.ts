import { globalPluginCore } from 'plugin'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useFormState } from './form'
import { useDsState } from './table'

interface PluginState {
	curPluginKey?: string
	changePlugin: (key: string) => void
}

export const usePluginState = create(
	persist<PluginState>(
		set => ({
			curPluginKey: '',
			changePlugin: (key: string) => {
				set({ curPluginKey: key })
				globalPluginCore.curPluginKey = key
				useFormState.getState().changeForm(key)
				useDsState.getState().changeTable(key)
			}
		}),
		{
			name: 'table-plugin-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
export default usePluginState
