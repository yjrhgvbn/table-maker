import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PluginState {
	pluginList: { key: string; name: string }[]
	addPlugin: (key: string) => void
}

export const usePluginState = create(
	persist<PluginState>(
		(set, get) => ({
			pluginList: [],
			addPlugin: (key?: string, name?: string) => {
				if (!key) return
				const { pluginList } = get()
				if (pluginList.findIndex(item => item.key === key) === -1) {
					pluginList.push({ key, name: name || key })
					set({ pluginList })
				}
			}
		}),
		{
			name: 'table-plugin-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
export default usePluginState
