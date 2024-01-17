import { FormItemConfigType, PluginConfig } from '../interface'
import { curlToHAR } from './parse'

export const plugin: PluginConfig = {
	key: 'curl',
	name: 'curl change',
	addColumn() {
		return [
			{
				key: 'key',
				header: '请求头'
			},
			{
				key: 'value',
				header: '请求头值'
			}
		]
	},
	addFormItem() {
		return [
			{
				key: 'authorization',
				label: '认证信息',
				type: FormItemConfigType.String
			}
		]
	},
	parseOutput(data, formData) {
		// return curlToHAR(data)
		return `${JSON.stringify(data)}\n${JSON.stringify(formData)}`
	},
	parseImport(data) {
		const res = curlToHAR(data)
		return Object.keys(res).map(key => ({
			id: key,
			key,
			value: res[key]
		}))
		// return res
	}
}
export default plugin
