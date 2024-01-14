import { FormItemValue, FormValue } from './interface'
import { createSlice } from './middleware'

export interface FormState {
	/** current form data */
	curForm: FormValue
	/** a record from data, plugin key as key */
	formData: Record<string, FormValue>
	updateCurrentPluginFormItem: (key: string, value: FormItemValue) => void
	updateCurrentPluginForm: (key: string, value: FormValue) => void
	updateData: (value: Record<string, FormValue>) => void
}

declare module 'state/middleware/type' {
	interface StateMutators {
		FormState: FormState
	}
}

createSlice<FormState>((set, get) => ({
	curForm: {},
	formData: {},
	updateCurrentPluginFormItem: (key: string, value: FormItemValue) => {
		const newFormData = { ...get().curForm, [key]: value }
		set({ curForm: newFormData })
		const { curPluginKey } = get()
		if (curPluginKey) get().updateCurrentPluginForm(curPluginKey, newFormData)
	},
	updateCurrentPluginForm: (key: string, value: FormValue) => {
		set({ formData: { ...get().formData, [key]: value } })
	},
	updateData: value => {
		set({ formData: value })
	}
}))
