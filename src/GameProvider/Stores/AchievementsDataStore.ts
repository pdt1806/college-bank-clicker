import { create } from "zustand";
import { AchievementListType, AchievementsDataState } from "../../utils/types";

const achievementsData = localStorage.getItem("achievementsData");

export const AchievementsDataStore = create<AchievementsDataState>()((set) => ({
  achievements: achievementsData ? JSON.parse(achievementsData) : {},
  achievementRewardMultiplier: 1,

  setAchievements: (achievements: AchievementListType) => set({ achievements }),
  setAchievementRewardMultiplier: (multiplier: number) => set({ achievementRewardMultiplier: multiplier }),

  saveAchievements: () => {
    const achievements = AchievementsDataStore.getState().achievements;
    localStorage.setItem("achievementsData", JSON.stringify(achievements));
  },

  resetAchievements: () => {
    set({ achievements: {}, achievementRewardMultiplier: 1 });
    localStorage.removeItem("achievementsData");
  },
}));
