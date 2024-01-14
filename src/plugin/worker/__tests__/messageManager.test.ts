// sum.test.js
import { expect, test, vi } from 'vitest'
import { MessageManager } from '../messageManager'

class MockWorker {
	onmessage: (m?: any) => void

	hasResponse: boolean = true

	constructor(hasResponse = true) {
		this.hasResponse = hasResponse
		this.onmessage = () => {}
	}

	addEventListener(event: string, callback: (m?: any) => void) {
		if (event === 'message') {
			this.onmessage = callback
		}
	}

	postMessage(message: any) {
		if (!this.hasResponse) return
		setTimeout(() => {
			this.onmessage({
				data: message
			})
		}, 500)
	}
}

const toSendMessage = 'hello world'
const toSendEventKey = 'addColumn'

test('can get response', async () => {
	const messageManager = new MessageManager(new MockWorker() as any)
	const mess = messageManager.send(toSendEventKey, toSendMessage)!
	const res = await new Promise(resolve => mess.on(resolve))
	expect(res).toBe(toSendMessage)
	expect(mess.isCancel).toBe(false)
})

test('cancel time out', async () => {
	const messageManager = new MessageManager(new MockWorker(false) as any)
	const mess = messageManager.send(toSendEventKey, toSendMessage)!
	const res = await new Promise(resolve => mess.on(resolve))
	expect(res).toBe(null)
	expect(mess.isCancel).toBe(true)
})

test('sending a message while waiting for a response only holds the last message', async () => {
	const messageManager = new MessageManager(new MockWorker() as any)
	const functionList = Array.from({ length: 4 })
		.fill(0)
		.map(async (_, index) => {
			const mockFunction = vi.fn()
			const mess = messageManager.send(toSendEventKey, toSendMessage + index)!
			mess.on(mockFunction)
			await new Promise(resolve => mess.on(resolve))
			expect(mockFunction).toHaveBeenCalledTimes(1)

			if (index === 0) {
				expect(mockFunction.mock.calls[0][0]).toBe(toSendMessage + 0)
			} else if (index === 3) {
				expect(mockFunction.mock.calls[0][0]).toBe(toSendMessage + 3)
			} else {
				expect(mockFunction.mock.calls[0][0]).toBe(null)
			}
		})
	await Promise.all(functionList)
})
