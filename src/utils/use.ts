import { ActionKeys, ActionParameters, messageManager } from 'plugin'
import useSWR from 'swr'

export function useWorkerMessage<T = any, K extends ActionKeys = 'addColumn'>(key: K, message: ActionParameters<K>, config?: { timeout?: number }) {
	// const [response, setResponse] = useState<any>()
	// const isLoading = useRef(true)
	// useEffect(() => {
	// 	const workerMessage = messageManager.send(key, message, config)
	// 	workerMessage.on(response_ => {
	// 		setResponse(response_)
	// 		isLoading.current = false
	// 	})
	// 	return () => {
	// 		workerMessage.cancel()
	// 	}
	// }, [key, message, config])
	// return {
	// 	data: response,
	// 	isLoading: isLoading.current
	// }
	return useSWR(
		{
			key,
			message: JSON.stringify(message)
		},
		() =>
			new Promise<T>(resolve => {
				const workerMessage = messageManager.send(key, message, config)
				workerMessage.on(resolve)
			})
	)
}

export default {}
