import { notifications } from "@mantine/notifications";
import {
  IconExclamationCircleFilled,
  IconStar,
  IconUpload,
} from "@tabler/icons-react";
import { allAchievements } from "../utils/achievements";
import { audio } from "../utils/audio";
import { AchievementsDataStore } from "./Stores/AchievementsDataStore";
import { GameDataStore } from "./Stores/GameDataStore";
import { SettingsDataStore } from "./Stores/SettingsDataStore";
import { StatsDataStore } from "./Stores/StatsDataStore";

export const increment = () => {
  const { money, setMoney, perClick, saveGame } = GameDataStore.getState();
  setMoney(money + perClick);
  saveGame();

  const { totalClicks, totalMoney, setTotalMoney, setTotalClicks } =
    StatsDataStore.getState();
  setTotalMoney(totalMoney + perClick);
  setTotalClicks(totalClicks + 1);

  playSound(audio.pop2);
};

export const buyUpgrade = (upgrade: Upgrade) => {
  const {
    money,
    perSecond,
    perClick,
    setMoney,
    setPerSecond,
    setPerClick,
    upgrades,
    setUpgrades,
    saveGame,
  } = GameDataStore.getState();

  const { saveStats } = StatsDataStore.getState();

  const updateUpgrades = () => {
    const currentUpgrades = upgrades[upgrade.id] || 0;
    const newUpgrades = {
      ...upgrades,
      [upgrade.id]: currentUpgrades + 1,
    } as UpgradeListType;
    setUpgrades(newUpgrades);
  };

  if (money >= currentCost(upgrade)) {
    playSound(audio.upgrade);
    setMoney(money - currentCost(upgrade));
    upgrade.perSecond && setPerSecond(perSecond + (upgrade.perSecond ?? 0));
    upgrade.perClick && setPerClick(perClick + (upgrade.perClick ?? 0));
    updateUpgrades();
  }

  saveGame();
  saveStats();
};

export const countUpgrade = (upgrade: Upgrade) => {
  const { upgrades } = GameDataStore.getState();
  return upgrades[upgrade.id] ?? 0;
};

export const currentCost = (upgrade: Upgrade) => {
  if (upgrade.costMultiplier === undefined) return upgrade.cost;
  return Math.floor(
    upgrade.cost * Math.pow(upgrade.costMultiplier ?? 1, countUpgrade(upgrade))
  );
};

export const resetAllGame = () => {
  const { resetGame } = GameDataStore.getState();
  const { resetAchievements } = AchievementsDataStore.getState();
  const { resetStats } = StatsDataStore.getState();
  resetGame();
  resetAchievements();
  resetStats();
};

export const saveAllGame = () => {
  const { saveGame } = GameDataStore.getState();
  const { saveStats } = StatsDataStore.getState();
  const { saveAchievements } = AchievementsDataStore.getState();
  saveGame();
  saveStats();
  saveAchievements();
};

export const exportAllGame = () => {
  saveAllGame();
  const data = {
    gameData: localStorage.getItem("gameData"),
    statsData: localStorage.getItem("statsData"),
    achievementsData: localStorage.getItem("achievementsData"),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =
    "college-bank-clicker-export-" + new Date().toISOString() + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const checkGameDataAuthenticity = (data: any) => {
  if (!data || typeof data !== "object") return "Invalid game data format.";

  try {
    JSON.parse(data.gameData);
    JSON.parse(data.statsData);
    JSON.parse(data.achievementsData);
  } catch (error) {
    return "Invalid game data structure. Please ensure the file is a valid game data file.";
  }

  if (!data.gameData) return "Game data is missing.";
  if (!data.statsData) return "Stats data is missing.";
  if (!data.achievementsData) return "Achievements data is missing.";

  return null; // Data is valid
};

export const importAllGame = (file: File | null) => {
  if (!file) return;

  const { setMoney, setPerSecond, setPerClick, setUpgrades, saveGame } =
    GameDataStore.getState();

  const {
    setTotalClicks,
    setTotalMoney,
    setTimeInGame,
    setMaxMoney,
    saveStats,
  } = StatsDataStore.getState();

  const { setAchievements, saveAchievements } =
    AchievementsDataStore.getState();

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target?.result as string);

      const invalid = checkGameDataAuthenticity(data);
      if (invalid) throw new Error(invalid);

      const { money, perSecond, perClick, upgrades } = JSON.parse(
        data.gameData
      );
      setMoney(money);
      setPerSecond(perSecond);
      setUpgrades(upgrades);
      setPerClick(perClick);

      const { totalClicks, totalMoney, timeInGame, maxMoney } = JSON.parse(
        data.statsData
      );
      setTotalClicks(totalClicks);
      setTotalMoney(totalMoney);
      setTimeInGame(timeInGame);
      setMaxMoney(maxMoney);

      const achievements = JSON.parse(data.achievementsData);
      setAchievements(achievements);

      saveGame();
      saveStats();
      saveAchievements();

      notifications.show({
        radius: "lg",
        styles: { title: { color: "var(--mantine-color-cbc-purple-9)" } },
        title: "Import Successful",
        message: "Game data has been successfully imported.",
        color: "cbc-green",
        autoClose: 3000,
        icon: <IconUpload size={24} />,
      });
    } catch (error: any) {
      return notifications.show({
        radius: "lg",
        styles: { title: { color: "var(--mantine-color-cbc-purple-9)" } },
        title: "Import Failed",
        message:
          error.message ?? "An error occurred while importing game data.",
        color: "red",
        autoClose: 5000,
        icon: <IconExclamationCircleFilled size={24} />,
      });
    }
  };
  reader.readAsText(file);
};

export const addAchievement = (achievement: Achievement | string) => {
  const { achievements, setAchievements, saveAchievements } =
    AchievementsDataStore.getState();

  if (typeof achievement === "string") {
    const foundAchievement = allAchievements.find(
      (ach) => ach.id === achievement
    );
    if (!foundAchievement) {
      console.warn(`Achievement with id "${achievement}" not found.`);
      return;
    }
    achievement = foundAchievement;
  }

  if (!achievements[achievement.id]) {
    const newAchievements = {
      ...achievements,
      [achievement.id]: achievement.date ?? new Date(),
    } as AchievementListType;
    setAchievements(newAchievements);
    saveAchievements();
    playSound(audio.achievement);
    notifications.show({
      radius: "lg",
      styles: { title: { color: "var(--mantine-color-cbc-purple-9)" } },
      title: "Achievement Unlocked!",
      message: achievement.name,
      color: "cbc-green",
      autoClose: 5000,
      position: "top-right",
      icon: <IconStar size={24} />,
    });
  }
};

export const playSound = (audio: HTMLAudioElement) => {
  const { sfxMutedIOS, sfxVolume } = SettingsDataStore.getState();

  const sound = new Audio(audio.src);
  sound.muted = sfxMutedIOS;
  sound.volume = sfxVolume / 100;
  sound.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
};
