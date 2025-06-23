import { ReactNode } from "react";
import { AchievementsDataProvider } from "./Contexts/AchievementsDataContext";
import { GameDataProvider } from "./Contexts/GameDataContext";
import { SettingsDataProvider } from "./Contexts/SettingsDataContext";
import { StatsDataProvider } from "./Contexts/StatsDataContext";

export const GameProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SettingsDataProvider>
      <AchievementsDataProvider>
        <StatsDataProvider>
          <GameDataProvider>{children}</GameDataProvider>
        </StatsDataProvider>
      </AchievementsDataProvider>
    </SettingsDataProvider>
  );
};
