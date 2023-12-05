import './plugin'

export * from './core'

// mock async import
const modules = import.meta.glob(['./*.ts', '!./index.ts'])
for (const module of Object.values(modules)) {
	module()
}
