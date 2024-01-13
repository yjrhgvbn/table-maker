// const PluginMy = window.__table_plugin__
// enum FieldType {
// 	String = 'string',
// 	Number = 'number',
// 	Boolean = 'boolean',
// 	Date = 'date',
// 	DateTime = 'datetime',
// 	Time = 'time',
// 	Lov = 'lov',
// 	LovView = 'lovView'
// }

// PluginMy.create({
// 	key: 'o2-form',
// 	name: 'curl changeable',
// 	addColumn() {
// 		return [
// 			{
// 				key: 'fileName',
// 				header: '字段名称'
// 			},
// 			{
// 				key: 'field',
// 				header: '字段'
// 			},
// 			{
// 				key: 'type',
// 				header: '类型',
// 				type: PluginMy.columnType.Select,
// 				options: Object.values(FieldType)
// 			},
// 			{
// 				key: 'required',
// 				header: '是否必输',
// 				type: PluginMy.columnType.Switch
// 			},
// 			{
// 				key: 'valueSet',
// 				header: '值集'
// 			}
// 		]
// 	},
// 	addFormItem() {
// 		return [
// 			{
// 				key: 'modelPrompt',
// 				label: 'modelPrompt',
// 				type: PluginMy.formItemConfigType.String
// 			}
// 		]
// 	},
// 	parseOutput(dsFieldList, formData) {
// 		let res = ''
// 		dsFieldList.forEach(dsField => {
// 			res += getFormItem(dsField, formData.modelPrompt)
// 		})
// 		return res
// 	},
// 	parseImport(data) {
// 		// const data = `LP合同金额	文本框	否	否	是	手动输入，品牌为欧莱雅 pro 或欧莱雅 pro+巴黎卡诗时，必输
// 		// KS合同金额	文本框	否	否	是	手动输入，品牌为巴黎卡诗或欧莱雅 pro+巴黎卡诗时，必输
// 		// 合同年度目标	文本框	否	否	是	手动输入
// 		// 合同年度返利	文本框	否	否	是	手动输入
// 		// 亚洲区培训名额	文本框	否	否	是	手动输入
// 		// 亚洲区培训达成	文本框	否	否	是	手动输入`
// 		const line = data.split('\n')
// 		return line.map(item => {
// 			const [name, type, required, valueSet] = item.split('\t')
// 			return {
// 				id: name,
// 				fileName: name,
// 				field: name,
// 				type: type === '文本框' ? 'string' : 'number',
// 				required: required === '是',
// 				valueSet: valueSet === '是' ? 'test' : undefined
// 			}
// 		})
// 		// const [name, type] = line[0].split('\t')
// 		// return [
// 		// 	{
// 		// 		id: 'test',
// 		// 		key: data,
// 		// 		value: 'test'
// 		// 	}
// 		// ]
// 	}
// })

// function getFormItem(dsField, modelPrompt) {
// 	const { field, fileName, type, required, valueSet } = dsField
// 	const label = () => `intl.get("${modelPrompt}.${field}").d("${fileName}")`
// 	const comParams = {
// 		label,
// 		field,
// 		required: Boolean(required)
// 	}
// 	if (type === FieldType.Lov) {
// 		return getColumString('O2FormLov', {
// 			label,
// 			field,
// 			required: Boolean(required),
// 			lovCode: valueSet
// 		})
// 	}
// 	if (type === FieldType.Number) {
// 		return getColumString('O2FormInputNumber', {
// 			label,
// 			field,
// 			required: Boolean(required)
// 		})
// 	} else if (type === FieldType.LovView) {
// 		return getColumString('O2FormLovView', {
// 			...comParams,
// 			lovCode: valueSet,
// 			showKey: 'valueName',
// 			map: () => `{
//   valueName: 'lovName',
//   valueId: 'lovId',
//   }`
// 		})
// 	}
// 	return getColumString('O2FormInput', {
// 		label,
// 		field,
// 		required: Boolean(required)
// 	})

// 	// res += `
// 	// <O2ColumnLov
// 	//   title={intl.get("${modelPrompt}.${name}").d('${label}')}
// 	//   field="${name}"
// 	//   fit
// 	//   lovCode="${lovCode}"
// 	// />`;
// }
// function getColumString(columnLName: string, params: Record<string, string | undefined | boolean | (() => string)>) {
// 	let res = `<${columnLName}\n`
// 	Object.keys(params).forEach(key => {
// 		const value = params[key]
// 		if (!value) return
// 		if (value === true) return (res += ` ${key}\n`)
// 		if (typeof value === 'function') {
// 			return (res += ` ${key}={${value()}}\n`)
// 		}
// 		res += ` ${key}={"${value}"}\n`
// 	})
// 	res += `/>\n`
// 	return res
// }
export default {}
