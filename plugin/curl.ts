import { FormItemConfigType, PluginConfig } from '../src/plugin'

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
		return `${JSON.stringify(data)}\n${JSON.stringify(formData)}`
	},
	parseImport(data) {
		return [
			{
				id: 'test',
				key: data,
				value: 'test'
			}
		]
	}
}
export default plugin
