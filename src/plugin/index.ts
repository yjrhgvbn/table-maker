import './plugin'

export * from './core'

const modules = import.meta.glob(['../../plugin/*.ts', '!../../plugin/index.ts'])
for (const module of Object.values(modules)) {
	module()
}
