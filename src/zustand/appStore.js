import { create } from 'zustand'

const useAppStore = create((set) => ({
  mapImg: null,
  setMapImg: (data) => set((state) => ({ mapImg: data })),
  reset: () => set({ mapImg: null }),
}))

export default useAppStore;