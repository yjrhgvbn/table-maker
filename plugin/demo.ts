import { FormItemConfigType, PluginConfig } from './interface'

const plugin: PluginConfig = {
	key: 'demo',
	name: 'demo',
	describe: '展示数据结果的demo插件',
	addColumn() {
		return [
			{
				key: 'key',
				header: 'demo-key'
			},
			{
				key: 'value',
				header: 'demo-value'
			}
		]
	},
	addFormItem() {
		return [
			{
				key: 'from',
				label: 'demo-form',
				type: FormItemConfigType.String
			}
		]
	},
	async parseImport() {
		await new Promise(resolve => setTimeout(resolve, 500))
		return [{ id: '0', key: 'demo', value: 'data' }]
	},
	async parseOutput(data, formData) {
		await new Promise(resolve => setTimeout(resolve, 500))
		return `data:\n ${JSON.stringify(data)}\n\n form:\n ${JSON.stringify(formData)}`
	}
}

export default plugin
