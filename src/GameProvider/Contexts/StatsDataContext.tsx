import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

export const StatsDataContext = createContext<StatsDataContextType>({} as StatsDataContextType);

export const StatsDataProvider = ({ children }: { children: ReactNode }) => {
  // --------------------
  // State for Stats Data

  const [totalClicks, setTotalClicks] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [timeInGame, setTimeInGame] = useState(0);
  const [maxMoney, setMaxMoney] = useState(0);

  // --------------------
  // State Ref for Total Stats

  const statsData = useRef({ totalClicks, totalMoney, timeInGame, maxMoney });
  useEffect(() => {
    statsData.current = { totalClicks, totalMoney, timeInGame, maxMoney };
  }, [totalClicks, totalMoney, timeInGame, maxMoney]);

  // Init total stats
  useEffect(() => {
    const savedStats = localStorage.getItem("statsData");
    if (savedStats) {
      const { totalClicks, totalMoney, timeInGame, maxMoney } = JSON.parse(savedStats);
      setTotalClicks(totalClicks);
      setTotalMoney(totalMoney);
      setTimeInGame(timeInGame);
      setMaxMoney(maxMoney);
    }
  }, []);

  const saveStats = () => localStorage.setItem("statsData", JSON.stringify(statsData.current));

  return (
    <StatsDataContext.Provider
      value={{
        totalClicks,
        totalMoney,
        timeInGame,
        maxMoney,
        setTotalClicks,
        setTotalMoney,
        setTimeInGame,
        setMaxMoney,
        saveStats,
      }}
    >
      {children}
    </StatsDataContext.Provider>
  );
};

export const useStatsData = (): StatsDataContextType => {
  const context = useContext(StatsDataContext);
  if (!context) throw new Error("useStatsData must be used within a GameProvider");
  return context;
};
