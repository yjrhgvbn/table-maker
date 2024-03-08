import { FormItemConfigType, PluginConfig } from '../interface'
import { curlToHAR } from './parse'

export const plugin: PluginConfig = {
	key: 'curl',
	name: 'curl',
	describe: '替换curl请求的authorization请求头',
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
		const formAuthorization = formData.authorization
		const dataObj = {} as Record<string, string>
		data.forEach(val => {
			dataObj[val.key as string] = val.value as string
		})
		if (dataObj.Authorization) {
			dataObj.Authorization = formAuthorization as string
		}
		const { method, url, queryString, postData, ...headers } = dataObj
		let curlCommand = `curl -X ${method} ${url} \\
  -H '${Object.entries(headers)
		.map(([key, value]) => `${key}: ${value}`)
		.join(`' -H '`)}'`
		if (postData) {
			curlCommand += ` \\
		-d '${JSON.stringify(postData)}'`
		}
		// return curlToHAR(data)
		return curlCommand
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
