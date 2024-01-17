import { addPlugin, execPlugin, getPluginList } from 'plugin/worker/plugin'
import { ActionKeys } from './interface'

// const interval = () => {
// 	timer = setInterval(() => {
// 		count++
// 		const now2 = performance.now()
// 		postMessage(count)
// 		console.log('误差值：', now2 - now1 - 1000 * count)
// 	}, 1000)
// }

// onmessage = function (event) {
// }
let resolveLoadPresetPlugin: (value?: any) => void
const loadPresetPluginPromise = new Promise(r => {
	resolveLoadPresetPlugin = r
})
async function loadPresetPlugin() {
	const modules = import.meta.glob(['../../../plugin/*.ts', '../../../plugin/*/index.ts', '!../../../plugin/interface.ts'])
	const loadFunctionList = Object.values(modules).map(module => module())

	const moduleResloveList: any[] = await Promise.all(loadFunctionList)
	for (const plugin of moduleResloveList) {
		addPlugin(plugin.default)
	}
	resolveLoadPresetPlugin()
}

function postMessageBack(event: MessageEvent<MessageDataType>, message: any) {
	postMessage({ eventKey: event.data.eventKey, id: event.data.id, message })
}

type MessageDataType = { eventKey: ActionKeys; id: string; message: any }
function handlePluginMessage(event: MessageEvent<MessageDataType>) {
	const { data } = event
	const { eventKey, message } = data
	switch (eventKey) {
		case 'getPluginList': {
			postMessageBack(event, getPluginList())
			break
		}
		case 'parseImport':
		case 'addColumn':
		case 'parseOutput':
		case 'addFormItem': {
			new Promise(resolve => {
				resolve(execPlugin(message.pluginKey, eventKey, ...(message.params || [])))
			}).then(response => {
				postMessageBack(event, response)
			})

			break
		}
		default: {
			postMessageBack(event, null)
			break
		}
	}
}
onmessage = function (event: MessageEvent<MessageDataType>) {
	loadPresetPluginPromise.then(() => {
		handlePluginMessage(event)
	})
}
await loadPresetPlugin()
