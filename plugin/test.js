const PluginMy = window.__table_plugin__
console.log('🚀 ~ file: test.js:2 ~ PluginMy:', PluginMy)

PluginMy.create({
	key: 'curl2',
	name: 'curl changeable',
	addColumn() {
		return [
			{
				key: 'key',
				header: '请求头asd'
			},
			{
				key: 'value',
				header: '请求头值asd'
			}
		]
	},
	addFormItem() {
		return [
			{
				key: 'authorization',
				label: '认证信息',
				type: PluginMy.formItemConfigType.String
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
})
