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

	postMessage(msg: any) {
		if (!this.hasResponse) return
		setTimeout(() => {
			this.onmessage({
				data: msg
			})
		}, 500)
	}
}

const toSendMessage = 'hello world'
const toSendEventKey = 'test'

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
	const fnList = new Array(4).fill(0).map(async (_, i) => {
		const mockFn = vi.fn()
		const mess = messageManager.send(toSendEventKey, toSendMessage + i)!
		mess.on(mockFn)
		await new Promise(resolve => mess.on(resolve))
		expect(mockFn).toHaveBeenCalledTimes(1)

		if (i === 0) {
			expect(mockFn.mock.calls[0][0]).toBe(toSendMessage + 0)
		} else if (i === 3) {
			expect(mockFn.mock.calls[0][0]).toBe(toSendMessage + 3)
		} else {
			expect(mockFn.mock.calls[0][0]).toBe(null)
		}
	})
	await Promise.all(fnList)
})
