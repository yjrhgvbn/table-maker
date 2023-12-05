import { createSlice } from './middleware'

interface PluginState {
	pluginList: { key: string; name: string }[]
	addPlugin: (key: string) => void
}

declare module 'state/middleware/type' {
	interface StateMutators {
		PluginState: PluginState
	}
}

createSlice<PluginState>((set, get) => ({
	pluginList: [],
	addPlugin: (key?: string, name?: string) => {
		if (!key) return
		const { pluginList } = get()
		if (pluginList.findIndex(item => item.key === key) === -1) {
			pluginList.push({ key, name: name || key })
			set({ pluginList })
		}
	}
}))
