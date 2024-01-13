import { addPlugin } from 'plugin/worker/plugin'

// const interval = () => {
// 	timer = setInterval(() => {
// 		count++
// 		const now2 = performance.now()
// 		postMessage(count)
// 		console.log('误差值：', now2 - now1 - 1000 * count)
// 	}, 1000)
// }

// onmessage = function (event) {
// 	console.log('🚀 ~ event:', event)
// }

onmessage = function () {
	// console.log('Worker: Message received from main script')
	// const result = e.data[0] * e.data[1]
	// if (result) {
	// 	postMessage('Please write two numbers')
	// } else {
	// 	const workerResult = `Result: ${result}`
	// 	console.log('Worker: Posting message back to main script')
	// 	postMessage(workerResult)
	// }
}
function loadPresetPlugin() {
	const modules = import.meta.glob(['../../plugin/*.ts', '!../../plugin/index.ts'])
	for (const module of Object.values(modules)) {
		module().then((m: any) => {
			if (m.default) {
				addPlugin(m.default)
			}
		})
	}
}
loadPresetPlugin()
