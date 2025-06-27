type GeneralUpgrade = {
  id: string;
  name: string;
  cost: number;
  costMultiplier: number;
  description: string;
};

type AutomaticUpgrade = GeneralUpgrade & {
  perSecond?: number;
};

type ManualUpgrade = GeneralUpgrade & {
  perClick?: number;
};

type Upgrade = AutomaticUpgrade & ManualUpgrade;

type UpgradeListType = {
  [key: string]: number;
};

type Achievement = {
  id: string;
  name: string;
  description: string;
  value?: number;
  date?: Date;
};

type AchievementsTab = {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  list: Achievement[];
};

type AchievementListType = {
  [key: string]: Date;
};

interface FloatingText {
  id: number;
  x: number;
  y: number;
  value: string;
}

interface UpgradeBarTab {
  name: string;
  icon: React.FC<{ size?: number; color?: string }>;
  description: string;
  list: Upgrade[];
}

interface GameDataState {
  money: number;
  perSecond: number;
  perClick: number;
  upgrades: UpgradeListType;
  setMoney: (money: number) => void;
  setPerSecond: (perSecond: number) => void;
  setPerClick: (perClick: number) => void;
  setUpgrades: (upgrades: UpgradeListType) => void;
  saveGame: () => void;
  resetGame: () => void;
}

interface SettingsDataState {
  musicVolume: number;
  sfxVolume: number;
  musicMutedIOS: boolean;
  sfxMutedIOS: boolean;
  TPS: number;
  offlineMode: boolean;
  setMusicVolume: (musicVolume: number) => void;
  setSfxVolume: (sfxVolume: number) => void;
  setMusicMutedIOS: (musicMutedIOS: boolean) => void;
  setSfxMutedIOS: (sfxMutedIOS: boolean) => void;
  setTPS: (TPS: number) => void;
  setOfflineMode: (offlineMode: boolean) => void;
  saveSettings: () => void;
}

interface StatsDataState {
  totalClicks: number;
  totalMoney: number;
  timeInGame: number;
  maxMoney: number;
  firstAccess: Date;
  lastAccess: Date;

  setTotalClicks: (totalClicks: number) => void;
  setTotalMoney: (totalMoney: number) => void;
  setTimeInGame: (timeInGame: number) => void;
  setMaxMoney: (maxMoney: number) => void;
  setFirstAccess: (firstAccess: Date) => void;
  setLastAccess: (lastAccess: Date) => void;

  saveStats: () => void;
  resetStats: () => void;
}

interface AchievementsDataState {
  achievements: AchievementListType;
  setAchievements: (achievements: AchievementListType) => void;
  saveAchievements: () => void;
  resetAchievements: () => void;
}

interface OutletContext {
  asideOpened: boolean;
  navbarOpened: boolean;
}
