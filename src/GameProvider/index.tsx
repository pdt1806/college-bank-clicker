import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [money, setMoney] = useState(0.0);
  const [perSecond, setPerSecond] = useState(0.0);
  const [upgrades, setUpgrades] = useState<UpgradeType[]>([]);

  const increment = (amount: number = 1) => setMoney((prev) => prev + amount);

  const buyUpgrade = (upgrade: UpgradeType) => {
    if (money >= upgrade.cost) {
      setMoney((prev) => prev - upgrade.cost);
      setPerSecond((prev) => prev + upgrade.perSecondIncrease);
      setUpgrades((prev) => [...prev, upgrade]);
    }
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
