import { nanoid } from 'nanoid'

export class WorkerMessage {
	/** response */
	response: any = null
	/** send message */
	sendMessage: any = null
	/** event key */
	eventKey: string = ''
	/** message id */
	id: string = nanoid()
	/** is cancel */
	isCancel: boolean = false
	/** is pedding */
	isPedding: boolean = true

	#cbList: ((response: any) => void)[] = []

	constructor(key: string, sendMessage: any) {
		this.eventKey = key
		this.sendMessage = sendMessage
		this.response = null
	}

	on(callback: (response: any) => void) {
		if (this.response || this.isCancel) {
			callback(this.response)
		} else {
			this.#cbList.push(callback)
		}
	}

	emit(response: any) {
		this.response = response
		this.#cbList.forEach(cb => cb(response))
		this.isPedding = false
	}

	cancel() {
		this.isCancel = true
		this.isPedding = false
		this.#cbList.forEach(cb => cb(null))
	}
}

export default WorkerMessage
