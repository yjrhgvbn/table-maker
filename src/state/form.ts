import { globalPluginCore } from 'plugin'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export enum FormItemConfigType {
	String = 'string',
	Select = 'select',
	Switch = 'switch'
}

export interface FormItemConfig {
	key?: string
	label?: string
	type?: FormItemConfigType
}

type FormItemValue = string | number | boolean
export type FormValue = Record<string, FormItemValue>
interface FormState {
	/** current form data */
	curForm: FormValue
	/** all from data, plugin key as key */
	data: Record<string, FormValue>
	/** current form config */
	formItemConfigs: FormItemConfig[]
	updateForm: (key: string, value: FormItemValue) => void
	updateData: (key: string, value: FormValue) => void
	changeForm: (key: string) => void
}

export const useFormState = create(
	persist<FormState>(
		(set, get) => ({
			curForm: {},
			data: {},
			formItemConfigs: [],
			updateForm: (key: string, value: FormItemValue) => {
				set({ curForm: { ...get().curForm, [key]: value } })
			},
			updateData: (key: string, value: FormValue) => {
				set({ data: { ...get().data, [key]: value } })
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
