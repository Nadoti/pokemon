import { create } from "zustand";

export type StateListCartModal = {
    listCart: {
      id: number;
      name: string;
      type: { name: string, slot: number }[];
      generation: string;
      color: string;
      status: {
        base_stat: number;
        stat: {
          name: string;
        }
      }[]
    }[];
  };
    


  export type ActionListCartModal = {
    addPokemonOnList: (data: StateListCartModal['listCart'][0]) => void;
    removePokemonOnList: (data: StateListCartModal['listCart']) => void;
    cleanList: () => void;
  };
  


  export const useListPokemonCart = create<StateListCartModal & ActionListCartModal>((set) => ({
    listCart: [],
    addPokemonOnList: (data) => set((state) => ({ listCart: [...state.listCart, data] })),
    removePokemonOnList: (data) => set((state) => ({ listCart: data })),
    cleanList: () => set((state) => ({ listCart: [] })),
  }));
  