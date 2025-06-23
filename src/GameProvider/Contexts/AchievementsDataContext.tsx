import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";

export const AchievementsDataContext = createContext<AchievementsDataContextType>({} as AchievementsDataContextType);

export const AchievementsDataProvider = ({ children }: { children: ReactNode }) => {
  // --------------------
  // State for Achievements Data

  const [achievements, setAchievements] = useState<AchievementListType>({});

  // --------------------
  // State Ref for Achievements Data

  const achievementsData = useRef<AchievementListType>(achievements);
  useEffect(() => {
    achievementsData.current = achievements;
  }, [achievements]);

  // --------------------
  // Achievements Logic

  const saveAchievements = () => localStorage.setItem("achievementsData", JSON.stringify(achievementsData.current));

  // Init achievements
  useEffect(() => {
    const savedAchievements = localStorage.getItem("achievementsData");
    if (savedAchievements) {
      const achievementsList = JSON.parse(savedAchievements);
      setAchievements(achievementsList);
    }
  }, []);

  // Save achievements on change
  useEffect(saveAchievements, [achievements]);

  return (
    <AchievementsDataContext.Provider value={{ achievements, saveAchievements, setAchievements }}>
      {children}
    </AchievementsDataContext.Provider>
  );
};

export const useAchievementsData = (): AchievementsDataContextType => {
  const context = useContext(AchievementsDataContext);
  if (!context) throw new Error("useAchievementsData must be used within a GameProvider");
  return context;
};
