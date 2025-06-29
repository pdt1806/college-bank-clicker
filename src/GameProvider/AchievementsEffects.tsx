import { useEffect } from "react";
import { clickAchievementList, moneyAchievementList, totalUpgradeAchievementList } from "../utils/achievements";
import { automaticUpgradeList, manualUpgradeList } from "../utils/upgrades";
import { addAchievement, countUpgrade } from "./GameActions";
import { GameDataStore } from "./Stores/GameDataStore";
import { StatsDataStore } from "./Stores/StatsDataStore";

export const AchievementsEffect = () => {
  // Check achievements based on upgrades
  useEffect(() => {
    const unsub = GameDataStore.subscribe((state) => {
      const { upgrades } = state;

      totalUpgradeAchievementList.forEach((achievement) => {
        if (Object.values(upgrades).reduce((total, value) => total + value, 0) >= achievement.value!)
          addAchievement(achievement);
      });

      const allManualUpgrades = manualUpgradeList.every((upgrade) => countUpgrade(upgrade) > 0);
      if (allManualUpgrades) addAchievement("achievement-upgrade-manual");

      const allAutomaticUpgrades = automaticUpgradeList.every((upgrade) => countUpgrade(upgrade) > 0);
      if (allAutomaticUpgrades) addAchievement("achievement-upgrade-automation");
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
