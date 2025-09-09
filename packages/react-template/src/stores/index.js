import { create } from 'zustand'

export const useCommonStore = create((set) => ({
    bears: 0,
    count: 1,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
}))
