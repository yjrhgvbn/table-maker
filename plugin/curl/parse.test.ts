import { expect, test } from 'vitest'
import curlToHAR from './parse'
// curl 'https://static-production.npmjs.com/homepage/homepage.a3021b95ee05a968f3b1.js' \
//   -H 'authority: static-production.npmjs.com' \
//   -H 'accept: */*' \
//   -H 'accept-language: zh-CN,zh;q=0.9' \
//   -H 'cache-control: no-cache' \
//   -H 'origin: https://www.npmjs.com' \
//   -H 'pragma: no-cache' \
//   -H 'referer: https://www.npmjs.com/' \
//   -H 'sec-ch-ua: "Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'sec-fetch-dest: script' \
//   -H 'sec-fetch-mode: cors' \
//   -H 'sec-fetch-site: same-site' \
//   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' \
//   --compressed

// curl 'https://example.com/' \
//   -X 'POST' \
//   -H 'authority: example.com' \
//   -H 'accept: */*' \
//   -H 'accept-language: zh-CN,zh;q=0.9' \
//   -H 'cache-control: no-cache' \
//   -H 'content-length: 0' \
//   -H 'origin: https://webbrowsertools.com' \
//   -H 'pragma: no-cache' \
//   -H 'referer: https://webbrowsertools.com/' \
//   -H 'sec-ch-ua: "Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'sec-fetch-dest: empty' \
//   -H 'sec-fetch-mode: cors' \
//   -H 'sec-fetch-site: cross-site' \
//   -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' \
//   --compressed
// curl --request POST --url 'http://mockbin.com/request?foo=bar&foo=baz' --header 'accept: application/json' --header 'content-type: application/json' --cookie 'foo=bar; bar=baz' --data '{"foo": "bar"}'

test('get', () => {
	const curl = `curl 'https://example.com/' \
  -H 'authority: example.com' \
  -H 'accept: */*' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'cache-control: no-cache' \
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
		origin: 'https',
		pragma: 'no-cache',
		queryString: [],
		referer: 'https',
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
