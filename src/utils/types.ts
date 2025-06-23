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

interface GameDataContextType {
  money: number;
  upgrades: UpgradeListType;
  perSecond: number;
  perClick: number;
  increment: (amount?: number) => void;
  buyUpgrade: (upgrade: AutomaticUpgrade) => void;
  countUpgrade: (upgrade: AutomaticUpgrade) => number;
  currentCost: (upgrade: AutomaticUpgrade) => number;
  saveGame: () => void;
  resetGameData: () => void;
  exportGameData: () => void;
  importGameData: (data: File) => void;
}

interface SettingsDataContextType {
  musicVolume: number;
  musicMutedIOS: boolean;
  sfxVolume: number;
  sfxMutedIOS: boolean;
  setMusicVolume: React.Dispatch<React.SetStateAction<number>>;
  setMusicMutedIOS: React.Dispatch<React.SetStateAction<boolean>>;
  setSfxVolume: React.Dispatch<React.SetStateAction<number>>;
  setSfxMutedIOS: React.Dispatch<React.SetStateAction<boolean>>;
  saveSettings: () => void;
  playSound: (audio: HTMLAudioElement) => void;
  TPS: number;
  setTPS: React.Dispatch<React.SetStateAction<number>>;
}

interface StatsDataContextType {
  totalMoney: number;
  totalClicks: number;
  timeInGame: number;
  maxMoney: number;
  setTotalClicks: React.Dispatch<React.SetStateAction<number>>;
  saveStats: () => void;
  setTotalMoney: React.Dispatch<React.SetStateAction<number>>;
  setTimeInGame: React.Dispatch<React.SetStateAction<number>>;
  setMaxMoney: React.Dispatch<React.SetStateAction<number>>;
}

interface AchievementsDataContextType {
  achievements: AchievementListType;
  saveAchievements: () => void;
  setAchievements: React.Dispatch<React.SetStateAction<AchievementListType>>;
}
