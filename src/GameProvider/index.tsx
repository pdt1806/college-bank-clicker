import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export const GameContext = createContext<GameContextType>(
  {} as GameContextType
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [money, setMoney] = useState(0.0);
  const [perSecond, setPerSecond] = useState(0.0);
  const [upgrades, setUpgrades] = useState<UpgradeListType>({});
  const [perClick, setPerClick] = useState(1);

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
      setMoney((prev) => prev - currentCost(upgrade));
      upgrade.perSecond &&
        setPerSecond((prev) => prev + (upgrade.perSecond ?? 0));
      upgrade.perClick && setPerClick(upgrade.perClick ?? 1);
      updateUpgrades();
    }
  };

  const countUpgrade = (upgrade: Upgrade) => {
    return upgrades[upgrade.id] ?? 0;
  };

  const currentCost = (upgrade: Upgrade) => {
    if (upgrade.costFactor === 0) {
      return upgrade.cost;
    }
    const count = countUpgrade(upgrade);
    return Math.floor(upgrade.cost * Math.pow(upgrade.costFactor ?? 1, count));
  };

  const saveGame = () => {
    const gameData = {
      money,
      perSecond,
      perClick,
      upgrades,
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
    return gameData;
  };

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
    }, 10000);
    return () => clearInterval(interval);
  }, [money, perSecond, perClick, upgrades]);

  return (
    <GameContext.Provider
      value={{
        money,
        setMoney,
        increment,
        upgrades,
        setUpgrades,
        perSecond,
        setPerSecond,
        buyUpgrade,
        countUpgrade,
        currentCost,
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
