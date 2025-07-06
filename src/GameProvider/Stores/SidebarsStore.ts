import { create } from "zustand";
import { SidebarsState } from "../../utils/types";

export const SidebarsStore = create<SidebarsState>()((set) => ({
  asideOpened: false,
  navbarOpened: false,

  toggleAside: () => set((state) => ({ asideOpened: !state.asideOpened })),
  closeAside: () => set({ asideOpened: false }),
  toggleNavbar: () => set((state) => ({ navbarOpened: !state.navbarOpened })),
  closeNavbar: () => set({ navbarOpened: false }),
}));
