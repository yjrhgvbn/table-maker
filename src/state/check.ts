import { createSlice } from './middleware'

interface CheckState {
	curPluginKey?: string
	curListKey?: string
	curListName?: string
	isToSave?: boolean
	updateName: (name: string) => void
}
declare module 'state/middleware/type' {
	interface StateMutators {
		checkState: CheckState
	}
}

createSlice<CheckState>(set => ({
	curListKey: '',
	curPluginKey: '',
	curListName: '',
	isToSave: false,
	updateName: (name: string) => {
		set({ curListName: name })
	}
}))
