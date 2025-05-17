import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const GameContext = createContext<GameContextType>({} as GameContextType);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState(0);
  const [incrementAmount, setIncrementAmount] = useState(1);
  const [time, setTime] = useState(1000);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([]);

  const increment = (amount: number = 1) => setStudents((prev) => prev + amount);
  const decrementTime = (amount: number = 1) => setTime((prev) => prev - amount);

  useEffect(() => {
    const interval = setInterval(() => {
      increment(incrementAmount);
    }, time);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <GameContext.Provider
      value={{
        students,
        setStudents,
        increment,
        upgrades,
        setUpgrades,
        time,
        setTime,
        decrementTime,
        incrementAmount,
        setIncrementAmount,
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
