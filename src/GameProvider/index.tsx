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
  const [upgrades, setUpgrades] = useState<Upgrade[]>([]);
  const [perClick, setPerClick] = useState(1);

  const increment = () => setMoney((prev) => prev + perClick);

  const buyUpgrade = (upgrade: Upgrade) => {
    if (money >= currentCost(upgrade)) {
      setMoney((prev) => prev - currentCost(upgrade));
      upgrade.perSecond &&
        setPerSecond((prev) => prev + (upgrade.perSecond ?? 0));
      setUpgrades((prev) => [...prev, upgrade]);
      upgrade.perClick && setPerClick(upgrade.perClick ?? 1);
    }
  };

  const countUpgrade = (upgrade: Upgrade) => {
    return upgrades.filter((u) => u.id === upgrade.id).length;
  };

  const currentCost = (upgrade: Upgrade) => {
    if (upgrade.costFactor === 0) {
      return upgrade.cost;
    }
    const count = countUpgrade(upgrade);
    return Math.floor(upgrade.cost * Math.pow(upgrade.costFactor ?? 1, count));
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
