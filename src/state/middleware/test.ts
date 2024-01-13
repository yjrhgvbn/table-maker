import { create, StateCreator } from 'zustand'
import { computed } from './computed'

interface BearSlice {
	bears: number
	addBear: () => void
	eatFish: () => void
}

interface FishSlice {
	fishes: number
	addFish: () => void
}

interface SharedSlice {
	tes: number
	addBoth: () => void
	getBoth: () => void
}

const computeState = state => ({
	countSq: state.count ** 2
})

const createBearSlice: StateCreator<BearSlice & FishSlice, [], [], BearSlice> = (set, get) => ({
	bears: 0,
	addBear: () => set(state => ({ bears: state.bears + 1 })),
	eatFish: () => {
		set({ fishes: get().fishes - 1 })
		set(state => ({ fishes: state.fishes - 1 }))
	}
})

const createFishSlice = computed<
	BearSlice & FishSlice,
	{
		countSq: number
	}
>(
	set => ({
		fishes: 0,
		addFish: () => set(state => ({ fishes: state.fishes + 1 }))
	}),
	computeState
)

const createSharedSlice: StateCreator<BearSlice & FishSlice, [], [], SharedSlice> = (set, get) => ({
	tes: 0,
	addBoth: () => {
		// you can reuse previous methods
		get().addBear()
		get().addFish()
		// or do them from scratch
		// set((state) => ({ bears: state.bears + 1, fishes: state.fishes + 1 })
	},
	getBoth: () => get().bears + get().fishes
})

const useBoundStore = create<BearSlice & FishSlice & SharedSlice>()((...a) => ({
	...createBearSlice(...a),
	...createFishSlice(...a),
	...createSharedSlice(...a)
}))
