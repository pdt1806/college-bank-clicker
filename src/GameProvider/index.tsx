import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState(0.0);
  const [perSecond, setPerSecond] = useState(0.0);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([]);

  const increment = (amount: number = 1) => setStudents((prev) => prev + amount);

  useEffect(() => {
    let last = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const deltaSeconds = (now - last) / 1000;
      last = now;

      setStudents((prev) => prev + perSecond * deltaSeconds);
    }, 25);

    return () => clearInterval(interval);
  }, [perSecond]);

  return (
    <GameContext.Provider
      value={{
        students,
        setStudents,
        increment,
        upgrades,
        setUpgrades,
        perSecond,
        setPerSecond,
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
