import './plugin'

import list from './preset'

export * from './core'

for (const { module } of list) {
	module()
}
// mock async import
// import('../../plugin/curl')
// import('../../plugin/md')
