import { useEffect } from "react";
import { allUpgrades, automaticUpgradeList, manualUpgradeList } from "../utils/upgrades";
import { addInventoryItem, countUpgrade } from "./GameActions";
import { GameDataStore } from "./Stores/GameDataStore";
import { StatsDataStore } from "./Stores/StatsDataStore";

export const InventoryEffects = () => {
  // Check items based on upgrades
  useEffect(() => {
    const unsub = GameDataStore.subscribe((_) => {
      // const { upgrades } = state;

      const eachManualUpgradeLevel20 = manualUpgradeList.every((upgrade) => countUpgrade(upgrade) >= 20);
      if (eachManualUpgradeLevel20) addInventoryItem("item-double-next-20-every-200");

      const eachAutomaticUpgradeLevel30 = automaticUpgradeList.every((upgrade) => countUpgrade(upgrade) >= 30);
      if (eachAutomaticUpgradeLevel30) addInventoryItem("item-0.3-percent-chance-triple-30-secs");

      const eachUpgradeLevel10 = allUpgrades.every((upgrade) => countUpgrade(upgrade) >= 10);
      if (eachUpgradeLevel10) addInventoryItem("item-offline-earning-1");

      const eachUpgradeLevel25 = allUpgrades.every((upgrade) => countUpgrade(upgrade) >= 25);
      if (eachUpgradeLevel25) addInventoryItem("item-offline-earning-2");

      const eachUpgradeLevel50 = allUpgrades.every((upgrade) => countUpgrade(upgrade) >= 50);
      if (eachUpgradeLevel50) addInventoryItem("item-offline-earning-3");

      const eachUpgradeLevel100 = allUpgrades.every((upgrade) => countUpgrade(upgrade) >= 100);
      if (eachUpgradeLevel100) addInventoryItem("item-offline-earning-4");
    });

    return unsub;
  }, []);

  // Check items based on money
  // useEffect(() => {
  //   const unsub = GameDataStore.subscribe((state) => {
  //     const { maxMoney, setMaxMoney } = StatsDataStore.getState();

  //     const currentMoney = state.money;
  //     moneyAchievementList.forEach((achievement) => {
  //       if (currentMoney >= achievement.value!) addAchievement(achievement);
  //     });

  //     if (currentMoney > maxMoney) setMaxMoney(currentMoney);
  //   });

  //   return unsub;
  // }, []);

  // Check items based on total clicks
  useEffect(() => {
    const unsub = StatsDataStore.subscribe((state) => {
      const totalClicks = state.totalClicks;

      if (totalClicks >= 1000) addInventoryItem("item-click-100x");
    });

    return unsub;
  }, []);

  return null;
};
