import { create } from 'zustand'

export type StateCartModal = {
    isModal: boolean
}

export type ActionCartModal = {
    openCartModal: () => void;
    closeCartModal: () => void;
}

export const useCartModal = create< StateCartModal & ActionCartModal>((set) => ({
  isModal: false,
  openCartModal: () => set({ isModal: true}),
  closeCartModal: () => set({ isModal: false }),
}))