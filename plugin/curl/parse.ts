import { parse } from 'shell-quote'

const FLAG_CHAR = '-'
const ARGUMENT_MAP = {
	request: 'method'
}

function parseQueryString(url: string) {
	const hashes: { name: string; value: string }[] = []
	const qs = url.slice(url.indexOf('?')).slice(1)
	if (qs) {
		qs.split('&').forEach(function (pair: string) {
			hashes.push({
				name: pair.split('=')[0],
				value: pair.split('=')[1]
			})
		})
	}
	return hashes
}

function buildHAR(args: string[]) {
	const res: Record<string, string> = {
		method: 'GET',
		url: ''
	}

	// Handle url as first argument without --url flag
	if (args[0][0] !== FLAG_CHAR) {
		args.unshift('--url')
	}

	const argument_pairs = args.map((_, i) => (i % 2 ? [] : args.slice(i, i + 2))).filter(elem => elem.length === 2)

	argument_pairs.forEach(function (elem, idx, l) {
		const key = elem[0].slice(FLAG_CHAR.length)
		const lowerKey = key.toLowerCase()
		const value = elem[1]
		switch (lowerKey) {
			case '-url':
				res['url'] = value.substring(0, value.indexOf('?')) || value
				res['queryString'] = JSON.stringify(parseQueryString(value))
				break
			case 'h':
			case '-header':
				res[value.split(':')[0].trim()] = value.split(':')[1].trim()
				break
			case 'd':
			case '-data':
				res['postData'] = JSON.stringify({
					mimeType: 'application/json',
					text: JSON.parse(value)
				})
				break
			case 'x':
			case '-request':
				res['method'] = value
				break
			default:
				res[ARGUMENT_MAP[key]] = value
				break
		}
	})
	return res
}

export function curlToHAR(str: string): Record<string, string> {
	const tokens = parse(str)
	const cmd = tokens[0]
	if (cmd !== 'curl') {
		return []
	}
	const args = tokens.slice(1)
	return buildHAR(args as string[])
}

export default curlToHAR
