import { DiscordSDK } from "@discord/embedded-app-sdk";
import { create } from "zustand";
import { DiscordStoreState, DiscordUserType } from "../../utils/types";

export const DiscordStore = create<DiscordStoreState>()((set) => ({
  discordSdk: null,
  isInDiscord: false,
  user: null,
  currentPage: "Game",
  sessionId: "",

  setDiscordSdk: (discordSdk: DiscordSDK) => set({ discordSdk }),
  setIsInDiscord: (isInDiscord: boolean) => set({ isInDiscord }),
  setUser: (user: DiscordUserType | null) => set({ user }),
  setCurrentPage: (currentPage: string) => set({ currentPage }),
  setSessionId: (sessionId: string) => set({ sessionId }),
}));
