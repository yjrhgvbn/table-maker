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

	if (args[0][0] !== FLAG_CHAR) {
		args.unshift('--url')
	}
	const argsFilter = args.filter(v => v !== '')
	const argument_pairs = argsFilter.map((_, i) => (i % 2 ? [] : argsFilter.slice(i, i + 2))).filter(elem => elem.length === 2)

	argument_pairs.forEach(function (elem, idx, l) {
		if (!elem[0] || !elem[1]) return
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
				res[value.split(':')[0].trim()] = value.split(':').slice(1).join(':').trim()
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
		return {}
	}
	const args = tokens.slice(1)
	return buildHAR(args as string[])
}

export default curlToHAR
// curl 'http://baidu.com/' \
//   -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
//   -H 'Accept-Language: zh-CN,zh;q=0.9,en;q=0.8' \
//   -H 'Cookie: MCITY=-289%3A; BAIDUID=2FDA021E59518757B8620526479E64EA:FG=1; BIDUPSID=2FDA021E59518757B8620526479E64EA; PSTM=1706086525; H_PS_PSSID=40206_40212_40215_40222_40061_40256_40294_40287_40284_40317_40079_40351' \
//   -H 'Proxy-Connection: keep-alive' \
//   -H 'Upgrade-Insecure-Requests: 1' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' \
//   --insecure
