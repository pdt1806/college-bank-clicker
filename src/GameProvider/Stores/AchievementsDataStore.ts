import { create } from "zustand";

const achievementsData = localStorage.getItem("achievementsData");

export const AchievementsDataStore = create<AchievementsDataState>((set) => ({
  achievements: achievementsData ? JSON.parse(achievementsData) : {},

  setAchievements: (achievements: AchievementListType) => set({ achievements }),

  saveAchievements: () => {
    const achievements = AchievementsDataStore.getState().achievements;
    localStorage.setItem("achievementsData", JSON.stringify(achievements));
  },

  resetAchievements: () => {
    set({ achievements: {} });
    localStorage.removeItem("achievementsData");
  },
}));
