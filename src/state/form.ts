import { globalPluginCore } from 'plugin'
import { FormItemConfig } from 'types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useCheckState } from './check'

type FormItemValue = string | number | boolean
export type FormValue = Record<string, FormItemValue>
export interface FormState {
	/** current form data */
	curForm: FormValue
	/** a record from data, plugin key as key */
	data: Record<string, FormValue>
	/** current form config */
	formItemConfigs: FormItemConfig[]
	updateCurrentPluginFormItem: (key: string, value: FormItemValue) => void
	updateCurrentPluginForm: (key: string, value: FormValue) => void
	updateData: (value: Record<string, FormValue>) => void
	changeForm: (key: string) => void
}

export const useFormState = create(
	persist<FormState>(
		(set, get) => ({
			curForm: {},
			data: {},
			formItemConfigs: [],
			updateCurrentPluginFormItem: (key: string, value: FormItemValue) => {
				const newFormData = { ...get().curForm, [key]: value }
				set({ curForm: newFormData })
				const { curPluginKey } = useCheckState.getState()
				if (curPluginKey) get().updateCurrentPluginForm(curPluginKey, newFormData)
			},
			updateCurrentPluginForm: (key: string, value: FormValue) => {
				set({ data: { ...get().data, [key]: value } })
			},
			updateData: value => {
				set({ data: value })
			},
			changeForm: (key: string) => {
				const newFormItemConfig = (globalPluginCore.execSpecify(key, 'addFormItem') || []).filter(Boolean)
				set({ curForm: get().data[key] || {}, formItemConfigs: newFormItemConfig })
			}
		}),
		{
			name: 'table-form-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
)

export default useFormState
