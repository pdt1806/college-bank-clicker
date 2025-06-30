import { create } from "zustand";

const statsData = localStorage.getItem("statsData");
const parsedStatsData = statsData ? JSON.parse(statsData) : {};

const newDate = new Date();
sessionStorage.setItem("lastAccess", parsedStatsData?.lastAccess ?? newDate);

export const StatsDataStore = create<StatsDataState>()((set) => ({
  totalClicks: parsedStatsData?.totalClicks ?? 0,
  totalMoney: parsedStatsData?.totalMoney ?? 0,
  timeInGame: parsedStatsData?.timeInGame ?? 0,
  maxMoney: parsedStatsData?.maxMoney ?? 0,
  firstAccess: parsedStatsData?.firstAccess ?? newDate,
  lastAccess: parsedStatsData?.lastAccess ?? newDate,

  setTotalClicks: (totalClicks: number) => set({ totalClicks }),
  setTotalMoney: (totalMoney: number) => set({ totalMoney }),
  setTimeInGame: (timeInGame: number) => set({ timeInGame }),
  setMaxMoney: (maxMoney: number) => set({ maxMoney }),
  setFirstAccess: (firstAccess: Date) => set({ firstAccess }),
  setLastAccess: (lastAccess: Date) => set({ lastAccess }),

  incrementTotalClicks: (number: number) => set((state) => ({ totalClicks: state.totalClicks + number })),
  incrementTotalMoney: (number: number) => set((state) => ({ totalMoney: state.totalMoney + number })),
  incrementTimeInGame: (number: number) => set((state) => ({ timeInGame: state.timeInGame + number })),

  saveStats: () => {
    const state = StatsDataStore.getState();
    localStorage.setItem(
      "statsData",
      JSON.stringify({
        totalClicks: state.totalClicks,
        totalMoney: state.totalMoney,
        timeInGame: state.timeInGame,
        maxMoney: state.maxMoney,
        firstAccess: state.firstAccess,
        lastAccess: state.lastAccess,
      })
    );
  },

  resetStats: () => {
    const newDate = new Date();
    sessionStorage.setItem("lastAccess", newDate.toISOString());
    set({
      totalClicks: 0,
      totalMoney: 0,
      timeInGame: 0,
      maxMoney: 0,
      firstAccess: newDate,
      lastAccess: newDate,
    });
    localStorage.removeItem("statsData");
  },
}));
