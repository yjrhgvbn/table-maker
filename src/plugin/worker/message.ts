import { nanoid } from 'nanoid'
import { ActionKeys } from './interface'

export class WorkerMessage<T = any, S = any> {
	/** response */
	response: T | null = null

	/** send message */
	sendMessage: S

	/** event key */
	eventKey: ActionKeys

	/** message id */
	id: string = nanoid()

	/** is cancel */
	isCancel: boolean = false

	/** is pedding */
	isPedding: boolean = true

	#cbList: ((response: T | null) => void)[] = []

	constructor(key: ActionKeys, sendMessage: S) {
		this.eventKey = key
		this.sendMessage = sendMessage
	}

	on(callback: (response: T | null) => void) {
		if (this.response || this.isCancel) {
			callback(this.response)
		} else {
			this.#cbList.push(callback)
		}
	}

	emit(response: T) {
		this.response = response
		for (const callback of this.#cbList) callback(response)
		this.isPedding = false
	}

	cancel() {
		this.isCancel = true
		this.isPedding = false
		for (const callback of this.#cbList) callback(null)
	}
}

export default WorkerMessage
