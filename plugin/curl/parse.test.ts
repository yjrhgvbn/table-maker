import { expect, test } from 'vitest'
import curlToHAR from './parse'

test('get', () => {
	const curl = `curl 'https://example.com/' \
  -H 'authority: example.com' \
  -H 'accept: */*' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'cache-control: no-cache' \
  -H 'Cookie: MCITY=-289%3A; BAIDUID=2FDA021E59518757B8620526479E64EA:FG=1; BIDUPSID=2FDA021E59518757B8620526479E64EA; PSTM=1706086525; H_PS_PSSID=40206_40212_40215_40222_40061_40256_40294_40287_40284_40317_40079_40351' \
  -H 'origin: https://webbrowsertools.com' \
  -H 'pragma: no-cache' \
  -H 'referer: https://webbrowsertools.com/' \
  -H 'sec-ch-ua: "Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' \
  --compressed`
	const res = curlToHAR(curl)
	expect(res).toMatchObject({
		accept: '*/*',
		'accept-language': 'zh-CN,zh;q=0.9',
		authority: 'example.com',
		'cache-control': 'no-cache',
		method: 'GET',
		origin: 'https://webbrowsertools.com',
		pragma: 'no-cache',
		queryString: '[]',
		referer: 'https://webbrowsertools.com/',
		Cookie:
			'MCITY=-289%3A; BAIDUID=2FDA021E59518757B8620526479E64EA:FG=1; BIDUPSID=2FDA021E59518757B8620526479E64EA; PSTM=1706086525; H_PS_PSSID=40206_40212_40215_40222_40061_40256_40294_40287_40284_40317_40079_40351',
		'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
		'sec-ch-ua-mobile': '?0',
		'sec-ch-ua-platform': '"macOS"',
		'sec-fetch-dest': 'empty',
		'sec-fetch-mode': 'cors',
		'sec-fetch-site': 'cross-site',
		url: 'https://example.com/',
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
	})
})

test('post', () => {
	const curl = `curl 'https://example.com/' -X 'POST' -H 'accept: */*'`
	const res = curlToHAR(curl)
	expect(res).toMatchObject({
		method: 'POST',
		accept: '*/*',
		url: 'https://example.com/'
	})
})

test('asd', () => {
	const curl = `curl 'http://localhost:5000/assets/style-4b9bfc02.css' \
  -H 'Accept: text/css,*/*;q=0.1' \
  -H 'Accept-Language: zh-CN,zh;q=0.9' \
  -H 'Connection: keep-alive' \
  -H 'If-Modified-Since: Fri, 08 Mar 2024 06:04:31 GMT' \
  -H 'If-None-Match: W/"1782-1709877871954"' \
  -H 'Referer: http://localhost:5000/' \
  -H 'Sec-Fetch-Dest: style' \
  -H 'Sec-Fetch-Mode: no-cors' \
  -H 'Sec-Fetch-Site: same-origin' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"'`
	const res = curlToHAR(curl)
	expect(res).toMatchSnapshot()
})
