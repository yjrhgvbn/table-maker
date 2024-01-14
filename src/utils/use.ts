import { ActionKeys, ActionParameters } from 'plugin'
import messageManager from 'plugin/worker/messageManager'
import { useEffect, useRef, useState } from 'react'

export function useWorkerMessage<K extends ActionKeys>(key: K, message: ActionParameters<K>, config?: { timeout?: number }) {
	const [response, setResponse] = useState<any>()
	const isLoading = useRef(true)
	useEffect(() => {
		const workerMessage = messageManager.send(key, message, config)
		workerMessage.on(response_ => {
			setResponse(response_)
			isLoading.current = false
		})
		return () => {
			workerMessage.cancel()
		}
	}, [key, message, config])
	return {
		data: response,
		isLoading: isLoading.current
	}
}

export default {}
