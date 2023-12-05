// https://github.com/chrisvander/zustand-computed
import { Mutate, StateCreator, StoreApi, StoreMutatorIdentifier } from 'zustand'
import { shallow } from 'zustand/shallow'

export type ComputedStateOptions = {
	equalityFn?: <Y>(a: Y, b: Y) => boolean
}

export type ComputedStateCreator = <
	T extends object,
	A extends object,
	Mps extends [StoreMutatorIdentifier, unknown][] = [],
	Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
	f: StateCreator<T, [...Mps, ['computed', A]], Mcs>,
	compute: (state: T) => A,
	options?: ComputedStateOptions
) => StateCreator<T, Mps, [['computed', A], ...Mcs], T & A>

type Cast<T, U> = T extends U ? T : U
type Write<T, U> = Omit<T, keyof U> & U
type StoreCompute<S, A> = S extends {
	getState: () => infer T
}
	? Omit<StoreApi<T & A>, 'setState'>
	: never
type WithCompute<S, A> = Write<S, StoreCompute<S, A>>

declare module 'zustand' {
	interface StoreMutators<S, A> {
		computed: WithCompute<Cast<S, object>, A>
	}
}

type ComputedStateImpl = <T extends object, A extends object>(
	f: StateCreator<T, [], []>,
	compute: (state: T) => A,
	options?: ComputedStateOptions
) => StateCreator<T, [], [], T & A>

type SetStateWithArguments = Parameters<ReturnType<ComputedStateImpl>>[0] extends (...arguments_: infer U) => void
	? (...arguments_: [...U, ...unknown[]]) => void
	: never

const computedImpl: ComputedStateImpl = (f, compute, options) => {
	// set of keys that have been accessed in any compute call
	const trackedSelectors = new Set<string | number | symbol>()
	return (set, get, api) => {
		type T = ReturnType<typeof f>
		type A = ReturnType<typeof compute>

		const equalityFunction = options?.equalityFn ?? shallow

		// we track which selectors are accessed
		const computeAndMerge = (state: T | (T & A)): T & A => {
			// create a Proxy to track which selectors are accessed
			const stateProxy = new Proxy(
				{ ...state },
				{
					get: (_, property) => {
						trackedSelectors.add(property)
						return state[property as keyof T]
					}
				}
			)

			// calculate the new computed state
			const computedState: A = compute(stateProxy)

			// if part of the computed state did not change according to the equalityFn
			// then we use the object ref from the previous state. This is to prevent
			// unnecessary re-renders.
			for (const k of Object.keys(computedState) as (keyof A)[]) {
				if (equalityFunction(computedState[k], (state as T & A)[k])) {
					computedState[k] = (state as T & A)[k]
				}
			}

			return { ...state, ...computedState }
		}

		// higher level function to handle compute & compare overhead
		const setWithComputed = (update: T | ((state: T) => T), replace?: boolean, ...arguments_: unknown[]) => {
			;(set as SetStateWithArguments)(
				(state: T): T & A => {
					const updated = typeof update === 'object' ? update : update(state)
					return computeAndMerge({ ...state, ...updated })
				},
				replace,
				...arguments_
			)
		}

		const wrapApi = api as Mutate<StoreApi<T>, [['computed', A]]>
		wrapApi.setState = setWithComputed
		const st = f(setWithComputed, get, wrapApi) as T & A
		return { ...st, ...compute(st) }
	}
}

export const computed = computedImpl as unknown as ComputedStateCreator
export default computed
