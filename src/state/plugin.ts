import { createSlice } from './middleware'

interface PluginState {
	pluginList: { key: string; name: string }[]
	setPluginList: (list: { key: string; name: string }[]) => void
}

declare module 'state/middleware/type' {
	interface StateMutators {
		PluginState: PluginState
	}
}

createSlice<PluginState>(set => ({
	pluginList: [],
	setPluginList: list => {
		set({ pluginList: list })
	}
}))
