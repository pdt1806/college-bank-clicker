import { notifications } from "@mantine/notifications";
import { IconStar } from "@tabler/icons-react";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { clickAchievementList, moneyAchievementList, upgradeAchievementList } from "../utils/achievements";
import { audio } from "../utils/audio";

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [money, setMoney] = useState(0.0);
  const [perSecond, setPerSecond] = useState(0.0);
  const [upgrades, setUpgrades] = useState<UpgradeListType>({});
  const [perClick, setPerClick] = useState(1);

  const [musicVolume, setMusicVolume] = useState(50);
  const [sfxVolume, setSfxVolume] = useState(50);
  const [musicMutedIOS, setMusicMutedIOS] = useState(false);
  const [sfxMutedIOS, setSfxMutedIOS] = useState(false);

  const [totalClicks, setTotalClicks] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [timeInGame, setTimeInGame] = useState(0);

  const [achievements, setAchievements] = useState<Achievement[]>([]);

  // --------------------
  // State Ref for Game Data

  const gameData = useRef({ money, perSecond, perClick, upgrades });

  useEffect(() => {
    gameData.current = { money, perSecond, perClick, upgrades };
  }, [money, perSecond, perClick, upgrades]);

  // --------------------
  // State Ref for Settings Data

  const settingsData = useRef({ musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS });

  useEffect(() => {
    settingsData.current = { musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS };
  }, [musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS]);

  // --------------------
  // State Ref for Total Stats & Achievements

  const totalStats = useRef({ totalClicks, totalMoney, timeInGame });
  useEffect(() => {
    totalStats.current = { totalClicks, totalMoney, timeInGame };
  }, [totalClicks, totalMoney, timeInGame]);

  const achievementsRef = useRef<Achievement[]>(achievements);
  useEffect(() => {
    achievementsRef.current = achievements;
  }, [achievements]);

  // --------------------
  // BGM Logic

  const bgm = audio.bgm;
  bgm.loop = true;
  bgm.muted = musicMutedIOS;
  bgm.volume = musicVolume / 100;

  document.body.addEventListener("click", () => {
    bgm.play().catch((err) => console.error("Playback failed:", err));
  });

  useEffect(() => {
    bgm.volume = musicVolume / 100;
    bgm.muted = musicMutedIOS;
  }, [musicVolume, musicMutedIOS]);

  // --------------------
  // Game Logic

  const increment = () => {
    setMoney((prev) => prev + perClick);
    setTotalMoney((prev) => prev + perClick);
  };

  const playSound = (audio: HTMLAudioElement) => {
    const sound = new Audio(audio.src);
    sound.muted = sfxMutedIOS;
    sound.volume = sfxVolume / 100;
    sound.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
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

  const saveGame = () => {
    localStorage.setItem("gameData", JSON.stringify(gameData.current));
  };

  const saveSettings = () => {
    localStorage.setItem("settingsData", JSON.stringify(settingsData.current));
  };

  const saveStats = () => {
    localStorage.setItem("statsData", JSON.stringify(totalStats.current));
  };

  const resetGameData = () => {
    setMoney(0);
    setPerSecond(0);
    setUpgrades({});
    setPerClick(1);

    setTotalClicks(0);
    setTotalMoney(0);
    setTimeInGame(0);

    setAchievements([]);

    localStorage.removeItem("gameData");
    localStorage.removeItem("statsData");
    localStorage.removeItem("achievementsData");
  };

  const addAchievement = (achievement: Achievement) => {
    if (!achievementsRef.current.some((a) => a.id === achievement.id)) {
      achievement.date = new Date();
      setAchievements((prev) => [...prev, achievement]);
      localStorage.setItem("achievementsData", JSON.stringify([...achievementsRef.current, achievement]));
      playSound(audio.achievement);
      notifications.show({
        title: "Achievement Unlocked!",
        message: achievement.name,
        color: "green",
        autoClose: 5000,
        position: "top-right",
        icon: <IconStar size={24} />,
      });
    }
  };

  // --------------------
  // React Effects

  // Increment money logic
  useEffect(() => {
    let last = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const deltaSeconds = (now - last) / 1000;
      last = now;

      setMoney((prev) => prev + perSecond * deltaSeconds);
      setTotalMoney((prev) => prev + perSecond * deltaSeconds);
    }, 25);

    return () => clearInterval(interval);
  }, [perSecond]);

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

  // Init settings data
  useEffect(() => {
    const savedSettings = localStorage.getItem("settingsData");
    if (savedSettings) {
      const { musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS } = JSON.parse(savedSettings);
      setMusicVolume(musicVolume);
      setSfxVolume(sfxVolume);
      setMusicMutedIOS(musicMutedIOS);
      setSfxMutedIOS(sfxMutedIOS);
    }
  }, []);

  // Init achievements
  useEffect(() => {
    const savedAchievements = localStorage.getItem("achievementsData");
    if (savedAchievements) {
      const achievementsList = JSON.parse(savedAchievements);
      setAchievements(achievementsList);
    }
  }, []);

  // Init total stats
  useEffect(() => {
    const savedStats = localStorage.getItem("statsData");
    if (savedStats) {
      const { totalClicks, totalMoney, timeInGame } = JSON.parse(savedStats);
      setTotalClicks(totalClicks);
      setTotalMoney(totalMoney);
      setTimeInGame(timeInGame);
    }
  }, []);

  // Save game interval
  useEffect(() => {
    const interval = setInterval(() => {
      saveGame();
      saveStats();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Save time in game
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInGame((prev) => prev + 1000); // Increment time in game by 1000ms
      saveStats();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Save settings on change
  useEffect(saveSettings, [musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS]);

  // Check achievements with conditions
  useEffect(() => {
    clickAchievementList.forEach((achievement) => {
      if (totalClicks >= achievement.value) addAchievement(achievement);
    });
  }, [totalClicks]);

  useEffect(() => {
    upgradeAchievementList.forEach((achievement) => {
      if (Object.values(upgrades).reduce((total, value) => total + value, 0) >= achievement.value)
        addAchievement(achievement);
    });
  }, [upgrades]);

  useEffect(() => {
    moneyAchievementList.forEach((achievement) => {
      if (money >= achievement.value) addAchievement(achievement);
    });
  }, [money]); // this has to be based on money, not totalMoney

  // --------------------
  // Context Provider

  return (
    <GameContext.Provider
      value={{
        money,
        upgrades,
        increment,
        perSecond,
        buyUpgrade,
        countUpgrade,
        currentCost,
        perClick,
        saveGame,
        musicVolume,
        setMusicVolume,
        musicMutedIOS,
        setMusicMutedIOS,
        sfxVolume,
        setSfxVolume,
        sfxMutedIOS,
        setSfxMutedIOS,
        saveSettings,
        resetGameData,
        totalClicks,
        totalMoney,
        setTotalClicks,
        saveStats,
        achievements,
        timeInGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
