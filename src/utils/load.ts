export function loadLocalScript(file: File) {
	const reader = new FileReader()
	reader.readAsText(file, 'utf8')
	reader.addEventListener('load', () => {
		// new Worker(URL.createObjectURL(new Blob([`(${worker_function.toString()})()`], { type: 'text/javascript' })))
		// TODO consider using sandbox
		// eslint-disable-next-line no-eval
		eval(reader.result as string)
	})
}
export default loadLocalScript
