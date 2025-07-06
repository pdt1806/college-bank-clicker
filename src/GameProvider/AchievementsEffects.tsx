import { useEffect } from "react";
import { clickAchievementList, moneyAchievementList, totalUpgradeAchievementList } from "../utils/achievements";
import { Upgrade } from "../utils/types";
import { automaticUpgradeList, manualUpgradeList } from "../utils/upgrades";
import { addAchievement, countUpgrade } from "./GameActions";
import { GameDataStore } from "./Stores/GameDataStore";
import { StatsDataStore } from "./Stores/StatsDataStore";

export const AchievementsEffect = () => {
  // Check achievements based on upgrades
  useEffect(() => {
    const unsub = GameDataStore.subscribe((state) => {
      const { upgrades } = state;

      // ----------------------------------------------
      // Check total upgrades

      totalUpgradeAchievementList.forEach((achievement) => {
        if (Object.values(upgrades).reduce((total, value) => total + value, 0) >= achievement.value!)
          addAchievement(achievement);
      });

      // ----------------------------------------------
      // Check all upgrades in each category

      const checkCategoryAllUpgrades = (list: Upgrade[], threshold: number) => {
        return list.every((upgrade) => countUpgrade(upgrade) >= threshold);
      };
      const achievementConfigs = [
        {
          list: manualUpgradeList,
          prefix: "achievement-upgrade-manual",
        },
        {
          list: automaticUpgradeList,
          prefix: "achievement-upgrade-automatic",
        },
      ];
      const thresholds = [
        { value: 1, suffix: "" },
        { value: 10, suffix: "-ten-times" },
        { value: 20, suffix: "-twenty-times" },
      ];
      achievementConfigs.forEach(({ list, prefix }) => {
        thresholds.forEach(({ value, suffix }) => {
          if (checkCategoryAllUpgrades(list, value)) {
            addAchievement(prefix + suffix);
          }
        });
      });

      // ----------------------------------------------
      //
    });

    return unsub;
  }, []);

  // Check achievements based on money
  useEffect(() => {
    const unsub = GameDataStore.subscribe((state) => {
      const { maxMoney, setMaxMoney } = StatsDataStore.getState();

      const currentMoney = state.money;
      moneyAchievementList.forEach((achievement) => {
        if (currentMoney >= achievement.value!) addAchievement(achievement);
      });

      if (currentMoney > maxMoney) setMaxMoney(currentMoney);
    });

    return unsub;
  }, []);

  // Check achievements based on total clicks
  useEffect(() => {
    const unsub = StatsDataStore.subscribe((state) => {
      const totalClicks = state.totalClicks;
      clickAchievementList.forEach((achievement) => {
        if (totalClicks >= achievement.value!) addAchievement(achievement);
      });
    });

    return unsub;
  }, []);

  return null;
};
