import { create } from "zustand";

const statsData = localStorage.getItem("statsData");
const parsedStatsData = statsData ? JSON.parse(statsData) : {};

export const StatsDataStore = create<StatsDataState>((set) => ({
  totalClicks: parsedStatsData?.totalClicks ?? 0,
  totalMoney: parsedStatsData?.totalMoney ?? 0,
  timeInGame: parsedStatsData?.timeInGame ?? 0,
  maxMoney: parsedStatsData?.maxMoney ?? 0,

  setTotalClicks: (totalClicks: number) => set({ totalClicks }),
  setTotalMoney: (totalMoney: number) => set({ totalMoney }),
  setTimeInGame: (timeInGame: number) => set({ timeInGame }),
  setMaxMoney: (maxMoney: number) => set({ maxMoney }),

  saveStats: () => {
    const state = StatsDataStore.getState();
    localStorage.setItem(
      "statsData",
      JSON.stringify({
        totalClicks: state.totalClicks,
        totalMoney: state.totalMoney,
        timeInGame: state.timeInGame,
        maxMoney: state.maxMoney,
      })
    );
  },

  resetStats: () => {
    set({
      totalClicks: 0,
      totalMoney: 0,
      timeInGame: 0,
      maxMoney: 0,
    });
    localStorage.removeItem("statsData");
  },
}));
