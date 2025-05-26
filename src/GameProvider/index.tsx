import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { audio } from "../utils/audio";

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [money, setMoney] = useState(0.0);
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

  const increment = () => setMoney((prev) => prev + perClick);

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
      new Audio(audio.upgrade).play().catch((error) => console.error("Audio playback failed:", error));

      setMoney((prev) => prev - currentCost(upgrade));
      upgrade.perSecond && setPerSecond((prev) => prev + (upgrade.perSecond ?? 0));
      upgrade.perClick && setPerClick((prev) => prev + (upgrade.perClick ?? 0));
      updateUpgrades();
    }

    saveGame();
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

  // const resetData = () => {
  //   setMoney(0);
  //   setPerSecond(0);
  //   setPerClick(1);
  //   setUpgrades({});
  //   localStorage.removeItem("gameData");
  // };

  // --------------------
  // React Effects

  useEffect(() => {
    let last = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const deltaSeconds = (now - last) / 1000;
      last = now;

      setMoney((prev) => prev + perSecond * deltaSeconds);
    }, 25);

    return () => clearInterval(interval);
  }, [perSecond]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      saveGame();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // --------------------
  // Context Provider

  return (
    <GameContext.Provider
      value={{
        money,
        increment,
        perSecond,
        buyUpgrade,
        countUpgrade,
        currentCost,
        perClick,
        saveGame,
        // resetData,
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
