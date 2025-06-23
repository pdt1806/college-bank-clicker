import { notifications } from "@mantine/notifications";
import { IconExclamationCircleFilled, IconStar, IconUpload } from "@tabler/icons-react";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import {
  allAchievements,
  clickAchievementList,
  moneyAchievementList,
  totalUpgradeAchievementList,
} from "../../utils/achievements";
import { audio } from "../../utils/audio";
import { automaticUpgradeList, manualUpgradeList } from "../../utils/upgrades";
import { useAchievementsData } from "./AchievementsDataContext";
import { useSettingsData } from "./SettingsDataContext";
import { useStatsData } from "./StatsDataContext";

export const GameDataContext = createContext<GameDataContextType>({} as GameDataContextType);

export const GameDataProvider = ({ children }: { children: ReactNode }) => {
  // --------------------
  // Use other contexts
  // This should be the only context that uses other contexts directly.

  const { playSound, TPS } = useSettingsData();
  const { achievements, setAchievements, saveAchievements } = useAchievementsData();
  const { setTotalClicks, setTotalMoney, setTimeInGame, setMaxMoney, saveStats, maxMoney, totalClicks } =
    useStatsData();

  // --------------------
  // State for Game Data

  const [money, setMoney] = useState(0);
  const [perSecond, setPerSecond] = useState(0.0);
  const [upgrades, setUpgrades] = useState<UpgradeListType>({});
  const [perClick, setPerClick] = useState(1);

  // --------------------
  // State Ref for Game Data

  const gameData = useRef({ money, perSecond, perClick, upgrades });

  useEffect(() => {
    gameData.current = { money, perSecond, perClick, upgrades };
  }, [money, perSecond, perClick, upgrades]);

  // --------------------
  // Game Logic

  const increment = () => {
    setMoney((prev) => prev + perClick);
    setTotalMoney((prev) => prev + perClick);
    saveGame();
    setTotalClicks((prev) => prev + 1);
    saveStats();
    playSound(audio.pop2);
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    const updateUpgrades = () => {
      const currentUpgrades = upgrades[upgrade.id] || 0;
      const newUpgrades = currentUpgrades + 1;
      setUpgrades((prev) => ({
        ...prev,
        [upgrade.id]: newUpgrades,
      }));
    };

    if (money >= currentCost(upgrade)) {
      playSound(audio.upgrade);
      setMoney((prev) => prev - currentCost(upgrade));
      upgrade.perSecond && setPerSecond((prev) => prev + (upgrade.perSecond ?? 0));
      upgrade.perClick && setPerClick((prev) => prev + (upgrade.perClick ?? 0));
      updateUpgrades();
    }

    saveGame();
    saveStats();
  };

  const countUpgrade = (upgrade: Upgrade) => {
    return upgrades[upgrade.id] ?? 0;
  };

  const currentCost = (upgrade: Upgrade) => {
    if (upgrade.costMultiplier === undefined) return upgrade.cost;
    return Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier ?? 1, countUpgrade(upgrade)));
  };

  const saveGame = () => localStorage.setItem("gameData", JSON.stringify(gameData.current));

  const resetGameData = () => {
    setMoney(0);
    setPerSecond(0);
    setUpgrades({});
    setPerClick(1);

    setTotalClicks(0);
    setTotalMoney(0);
    setTimeInGame(0);
    setMaxMoney(0);

    setAchievements({});

    localStorage.removeItem("gameData");
    localStorage.removeItem("statsData");
    localStorage.removeItem("achievementsData");
  };

  const exportGameData = () => {
    [saveGame, saveStats, saveAchievements].forEach((fn) => fn());
    const gameData = {
      gameData: localStorage.getItem("gameData"),
      statsData: localStorage.getItem("statsData"),
      achievementsData: localStorage.getItem("achievementsData"),
    };
    const blob = new Blob([JSON.stringify(gameData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "college-bank-clicker-export-" + new Date().toISOString() + ".json";
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

  const importGameData = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);

        const invalid = checkGameDataAuthenticity(data);
        if (invalid) throw new Error(invalid);

        const { money, perSecond, perClick, upgrades } = JSON.parse(data.gameData);
        setMoney(money);
        setPerSecond(perSecond);
        setUpgrades(upgrades);
        setPerClick(perClick);

        const { totalClicks, totalMoney, timeInGame, maxMoney } = JSON.parse(data.statsData);
        setTotalClicks(totalClicks);
        setTotalMoney(totalMoney);
        setTimeInGame(timeInGame);
        setMaxMoney(maxMoney);

        const achievementsList = JSON.parse(data.achievementsData);
        setAchievements(achievementsList);

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
          message: error.message ?? "An error occurred while importing game data.",
          color: "red",
          autoClose: 5000,
          icon: <IconExclamationCircleFilled size={24} />,
        });
      }
    };
    reader.readAsText(file);
  };

  // since it depends on playSound also, put this function in this instead of AchievementsDataContext
  const addAchievement = (achievement: Achievement | string) => {
    if (typeof achievement === "string") {
      const foundAchievement = allAchievements.find((ach) => ach.id === achievement);
      if (!foundAchievement) {
        console.warn(`Achievement with id "${achievement}" not found.`);
        return;
      }
      achievement = foundAchievement;
    }

    if (!achievements[achievement.id]) {
      setAchievements((prev) => ({
        ...prev,
        [achievement.id]: achievement.date ?? new Date(),
      }));
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

  // --------------------
  // React Effects

  // Increment money logic
  // using RAF + TPS for smooth updates & saving battery
  useEffect(() => {
    if (perSecond == 0) return;

    let lastFrameTime = performance.now();
    const frameDuration = 1000 / TPS;

    const tick = (now: number) => {
      const delta = now - lastFrameTime;

      if (delta >= frameDuration) {
        lastFrameTime = now;

        const deltaSeconds = delta / 1000;
        const earned = perSecond * deltaSeconds;
        setMoney((prev) => prev + earned);
        setTotalMoney((prev) => prev + earned);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    let animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, [perSecond, TPS]);

  // Init game data
  useEffect(() => {
    const savedGame = localStorage.getItem("gameData");
    if (savedGame) {
      const { money, perSecond, perClick, upgrades } = JSON.parse(savedGame);
      setMoney(money);
      setPerSecond(perSecond);
      setUpgrades(upgrades);
      setPerClick(perClick);
    }
  }, []);

  // Save game interval - runs every second
  useEffect(() => {
    const interval = setInterval(() => {
      saveGame();
      setTimeInGame((prev) => prev + 1);
      saveStats();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    totalUpgradeAchievementList.forEach((achievement) => {
      // This checks total upgrades purchased count
      if (Object.values(upgrades).reduce((total, value) => total + value, 0) >= achievement.value!)
        addAchievement(achievement);
    });

    // This checks if all upgrades of a specific category are purchased
    const allManualUpgrades = manualUpgradeList.every((upgrade) => countUpgrade(upgrade) > 0);
    if (allManualUpgrades) addAchievement("achievement-upgrade-manual");

    const allAutomaticUpgrades = automaticUpgradeList.every((upgrade) => countUpgrade(upgrade) > 0);
    if (allAutomaticUpgrades) addAchievement("achievement-upgrade-automation");
  }, [upgrades]);

  useEffect(() => {
    moneyAchievementList.forEach((achievement) => {
      if (money >= achievement.value!) addAchievement(achievement);
    });

    if (money > maxMoney) setMaxMoney(money);
  }, [money]);

  // Check achievements based on total clicks
  useEffect(() => {
    clickAchievementList.forEach((achievement) => {
      if (totalClicks >= achievement.value!) addAchievement(achievement);
    });
  }, [totalClicks]);

  // --------------------
  // Context Provider

  return (
    <GameDataContext.Provider
      value={{
        money,
        upgrades,
        perSecond,
        perClick,
        increment,
        buyUpgrade,
        countUpgrade,
        currentCost,
        saveGame,
        resetGameData,
        exportGameData,
        importGameData,
      }}
    >
      {children}
    </GameDataContext.Provider>
  );
};

export const useGameData = (): GameDataContextType => {
  const context = useContext(GameDataContext);
  if (!context) throw new Error("useGameData must be used within a GameProvider");
  return context;
};
