import type { ActionKeys, ActionParameters } from './interface'
import { WorkerMessage } from './message'

export class MessageManager {
	waitResponseMessageMap: Map<ActionKeys, WorkerMessage> = new Map()

	waitRequestMessageMap: Map<ActionKeys, WorkerMessage> = new Map()

	worker: Worker

	constructor(worker: Worker) {
		this.worker = worker
		this.worker.addEventListener('message', event => {
			this.handleMessage(event)
		})
	}

	/**
	 * 给iframe发送消息，如果当前有同key名的消息没有响应，会保留最后一次消息进行发送
	 * @param eventKey 事件名
	 * @param message 消息
	 */
	send<K extends ActionKeys, T = any, S = ActionParameters<K>>(eventKey: ActionKeys, message: S, config?: { timeout?: number }) {
		const newMessage = new WorkerMessage<T, S>(eventKey, message, config)
		if (this.waitResponseMessageMap.has(eventKey)) {
			const preWaitRequestMessage = this.waitRequestMessageMap.get(eventKey)
			if (preWaitRequestMessage) preWaitRequestMessage.cancel()
			this.waitRequestMessageMap.set(eventKey, newMessage)
			return newMessage
		}
		this.sendToWorker(newMessage)
		return newMessage
	}

	private sendToWorker(message: WorkerMessage) {
		const toSendData = {
			eventKey: message.eventKey,
			message: message.sendMessage,
			id: message.id
		}
		this.waitResponseMessageMap.set(message.eventKey, message)
		this.worker.postMessage(toSendData)
		if (!message.config.timeout) return
		setTimeout(() => {
			this.cancelWaitRespone(message.id, message.eventKey)
		}, message.config.timeout)
	}

	/**
	 * 处理worker返回的消息
	 * @param event
	 * @returns
	 */
	handleMessage(event: MessageEvent) {
		const { data } = event
		const { eventKey, message, id } = data
		const workerMessage = this.waitResponseMessageMap.get(eventKey)
		if (!workerMessage || workerMessage.id !== id) return
		if (workerMessage) {
			workerMessage.emit(message)
			this.waitResponseMessageMap.delete(eventKey)
		}
		this.ensureWaitRequest(eventKey)
	}

	/**
	 * 发送等待中的消息
	 * @param eventKey 事件名
	 */
	private ensureWaitRequest(eventKey: ActionKeys) {
		const message = this.waitRequestMessageMap.get(eventKey)
		if (message) {
			this.sendToWorker(message)
			this.waitRequestMessageMap.delete(eventKey)
		}
	}

	/**
	 * 取消等待响应
	 * @param id 事件id
	 * @param eventKey 事件名
	 */
	cancelWaitRespone(id: string, eventKey: ActionKeys) {
		const message = this.waitResponseMessageMap.get(eventKey)
		if (message && message.id === id) {
			message.cancel()
			this.waitResponseMessageMap.delete(eventKey)
			this.ensureWaitRequest(eventKey)
		}
	}
}
export default MessageManager
