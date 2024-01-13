import { FormItemConfigType, PluginConfig } from '../src/plugin'

const plugin: PluginConfig = {
	key: 'md',
	name: 'md export',
	addColumn() {
		return [
			{
				key: 'key',
				header: '请求头-md'
			},
			{
				key: 'value',
				header: '请求头值-md'
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
		return `${JSON.stringify(data)}\n 123 ${JSON.stringify(formData)}`
	}
}

export default plugin
