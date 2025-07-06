import { create } from "zustand";

export const DiscordStore = create<DiscordStoreState>()((set) => ({
  isInDiscord: false,
  user: null,
  currentPage: "Game",
  sessionId: "",

  setIsInDiscord: (isInDiscord: boolean) => set({ isInDiscord }),
  setUser: (user: DiscordUserType | null) => set({ user }),
  setCurrentPage: (currentPage: string) => set({ currentPage }),
  setSessionId: (sessionId: string) => set({ sessionId }),
}));
