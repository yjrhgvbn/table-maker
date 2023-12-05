import { ComputedSateMutators, StateMutators } from 'state/middleware/type'
import { StateCreator, StoreApi, UseBoundStore, create } from 'zustand'
import { persist } from 'zustand/middleware'
import { computed } from './computed'

type MiddlewareMutator = [['zustand/persist', unknown], ['computed', GlobalComputedSate]]

/** filter out all attributes that are objects */
type PickObjectProperties<T> = {
	[K in keyof T]: T[K] extends Record<string, any> ? T[K] : never
}[keyof T]
/** union type to intersection type */
type ToUnionOfFunction<T> = T extends any ? (x: T) => any : never
type UnionToIntersection<T> = ToUnionOfFunction<T> extends (x: infer P) => any ? P : never
/** only pick object attributes, */
type PickAndMergeObjectProperties<T> = UnionToIntersection<PickObjectProperties<T>>

/** object attributes intersection */
type GlobalStore = PickAndMergeObjectProperties<StateMutators>
/** computed object attributes intersection */
type GlobalComputedSate = PickAndMergeObjectProperties<ComputedSateMutators>

type CreateSliceFunction<T = GlobalStore> = StateCreator<GlobalStore, MiddlewareMutator, [], T>
type CreateSlice = <T>(f: CreateSliceFunction<T>, computed?: (state: GlobalStore) => any) => void
const registerSlice: Parameters<CreateSlice>[] = []
export const createSlice: CreateSlice = (...argument) => {
	registerSlice.push(argument)
}

const runRegister = ((...parameters) => {
	const runResult = registerSlice.map(([f]) => f(...parameters))
	const result = {}
	for (const state of runResult) {
		Object.assign(result, state)
	}
	return result
}) as CreateSliceFunction

const runRegisterCompute = (parameters => {
	const runResult = registerSlice.map(([, compute]) => compute?.(parameters) || {})
	const result = {}
	for (const state of runResult) {
		Object.assign(result, state)
	}
	return result
}) as (state: GlobalStore) => GlobalComputedSate & object

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never
const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
	const store = _store as WithSelectors<typeof _store>
	store.use = {}
	for (const k of Object.keys(store.getState())) {
		;(store.use as any)[k] = () => store(s => s[k as keyof typeof s])
	}

	return store
}

export function createStore() {
	return createSelectors(
		create<GlobalStore, MiddlewareMutator>(
			persist(computed(runRegister, runRegisterCompute), {
				name: 'asd'
			})
		)
	)
}
