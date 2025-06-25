import { useEffect } from "react";
import {
  clickAchievementList,
  moneyAchievementList,
  totalUpgradeAchievementList,
} from "../utils/achievements";
import { audio } from "../utils/audio";
import { automaticUpgradeList, manualUpgradeList } from "../utils/upgrades";
import { addAchievement, countUpgrade } from "./GameActions";
import { GameDataStore } from "./Stores/GameDataStore";
import { SettingsDataStore } from "./Stores/SettingsDataStore";
import { StatsDataStore } from "./Stores/StatsDataStore";

export const GameEffects = () => {
  // --------------------
  // BGM & SFX Logic

  const bgm = audio.bgm;
  bgm.loop = true;

  useEffect(() => {
    const { musicVolume, musicMutedIOS } = SettingsDataStore.getState();
    bgm.muted = musicMutedIOS;
    bgm.volume = musicVolume / 100;

    bgm.volume = musicVolume / 100;
    bgm.muted = musicMutedIOS;

    document.body.addEventListener("click", () => {
      bgm.play().catch((err) => console.error("Playback failed:", err));
    });
  }, []);

  useEffect(() => {
    const unsub = SettingsDataStore.subscribe((state) => {
      const { musicVolume, musicMutedIOS, saveSettings } = state;
      bgm.volume = musicVolume / 100;
      bgm.muted = musicMutedIOS;
      saveSettings();
    });

    return unsub;
  }, []);

  // Increment money logic
  // using RAF + TPS for smooth updates & saving battery

  useEffect(() => {
    let lastFrameTime = performance.now();

    const tick = (now: number) => {
      const { money, perSecond, setMoney } = GameDataStore.getState();
      const { totalMoney, setTotalMoney } = StatsDataStore.getState();
      const { TPS } = SettingsDataStore.getState();

      const frameDuration = 1000 / TPS;
      const delta = now - lastFrameTime;

      if (perSecond > 0 && delta >= frameDuration) {
        lastFrameTime = now;

        const deltaSeconds = delta / 1000;
        const earned = perSecond * deltaSeconds;

        setMoney(money + earned);
        setTotalMoney(totalMoney + earned);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    let animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Save game interval - runs every second
  useEffect(() => {
    const interval = setInterval(() => {
      const { saveGame } = GameDataStore.getState();
      const { setTimeInGame, timeInGame, saveStats } =
        StatsDataStore.getState();

      saveGame();
      setTimeInGame(timeInGame + 1);
      saveStats();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Check achievements based on upgrades
  useEffect(() => {
    const unsub = GameDataStore.subscribe((state) => {
      const { upgrades } = state;

      totalUpgradeAchievementList.forEach((achievement) => {
        if (
          Object.values(upgrades).reduce((total, value) => total + value, 0) >=
          achievement.value!
        )
          addAchievement(achievement);
      });

      const allManualUpgrades = manualUpgradeList.every(
        (upgrade) => countUpgrade(upgrade) > 0
      );
      if (allManualUpgrades) addAchievement("achievement-upgrade-manual");

      const allAutomaticUpgrades = automaticUpgradeList.every(
        (upgrade) => countUpgrade(upgrade) > 0
      );
      if (allAutomaticUpgrades)
        addAchievement("achievement-upgrade-automation");
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
