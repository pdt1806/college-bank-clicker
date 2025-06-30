import { useEffect, useState } from "react";
import { allUpgrades, automaticUpgradeList, manualUpgradeList } from "../utils/upgrades";
import { addInventoryItem, countUpgrade } from "./GameActions";
import { AchievementsDataStore } from "./Stores/AchievementsDataStore";
import { GameDataStore } from "./Stores/GameDataStore";
import { InventoryDataStore } from "./Stores/InventoryDataStore";
import { StatsDataStore } from "./Stores/StatsDataStore";

export const InventoryEffects = () => {
  useEffect(() => {
    const unsub = GameDataStore.subscribe((_) => {
      // Check items based on upgrades

      const eachManualUpgradeLevel20 = manualUpgradeList.every((upgrade) => countUpgrade(upgrade) >= 20);
      if (eachManualUpgradeLevel20) addInventoryItem("item-double-next-20-every-200");

      const eachAutomaticUpgradeLevel30 = automaticUpgradeList.every((upgrade) => countUpgrade(upgrade) >= 30);
      if (eachAutomaticUpgradeLevel30) addInventoryItem("item-0.3-percent-chance-triple-30-secs");

      const eachUpgradeLevel50 = allUpgrades.every((upgrade) => countUpgrade(upgrade) >= 50);
      if (eachUpgradeLevel50) addInventoryItem("item-offline-earning-upgrade-50");

      ["upgrade-ap-physics-1", "upgrade-ap-chemistry", "upgrade-ap-us-history"].forEach((upgrade) => {
        if (countUpgrade(upgrade) >= 13) addInventoryItem("item-boost-2-for-50-clicks");
      });

      // ---
    });

    return unsub;
  }, []);

  useEffect(() => {
    const unsub = StatsDataStore.subscribe((state) => {
      // Check items based on total money
      const totalMoney = state.totalMoney;
      if (totalMoney >= 1000000) addInventoryItem("item-spike-3x-random");
      if (totalMoney >= 10000000) addInventoryItem("item-double-per-second-when-idle");

      // Check items based on total clicks
      const totalClicks = state.totalClicks;
      if (totalClicks >= 1000) addInventoryItem("item-click-100x");
    });

    return unsub;
  }, []);

  // Check items based on achievements
  useEffect(() => {
    const unsub = AchievementsDataStore.subscribe((state) => {
      const achievementsCount = Object.keys(state.achievements).length;

      if (achievementsCount >= 5) addInventoryItem("item-achievements-5");
      if (achievementsCount >= 10) addInventoryItem("item-achievements-10");
      if (achievementsCount >= 20) addInventoryItem("item-achievements-20");
    });

    return unsub;
  }, []);

  // --------------------------------

  // Check items collected, and what it does to the game (to those applicable)

  const totalClicksFor20Every200 = StatsDataStore((state) => state.totalClicks);
  const [clicksBefore200, setClicksBefore200] = useState(0);
  useEffect(() => {
    const hasThisItem = Object.keys(InventoryDataStore.getState().inventory).includes("item-double-next-20-every-200");
    if (!hasThisItem) return;

    const { boostedClicks, setBoostedClicks, setClickMultiplier } = GameDataStore.getState();
    if (boostedClicks == 0) setClicksBefore200((prev) => prev + 1);
    if (clicksBefore200 == 200) {
      setBoostedClicks(20);
      setClickMultiplier(2);
      setClicksBefore200(0);
    }
  }, [totalClicksFor20Every200]);

  return null;
};
