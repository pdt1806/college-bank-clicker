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

interface GameContextType {
  // setMoney: React.Dispatch<React.SetStateAction<number>>;
  // setPerSecond: React.Dispatch<React.SetStateAction<number>>;
  // upgrades: UpgradeListType;
  // setUpgrades: React.Dispatch<React.SetStateAction<UpgradeListType>>;
  money: number;
  upgrades: UpgradeListType;
  increment: (amount?: number) => void;
  perSecond: number;
  buyUpgrade: (upgrade: AutomaticUpgrade) => void;
  countUpgrade: (upgrade: AutomaticUpgrade) => number;
  currentCost: (upgrade: AutomaticUpgrade) => number;
  perClick: number;
  saveGame: () => void;
  musicVolume: number;
  setMusicVolume: React.Dispatch<React.SetStateAction<number>>;
  musicMutedIOS: boolean;
  setMusicMutedIOS: React.Dispatch<React.SetStateAction<boolean>>;
  sfxVolume: number;
  setSfxVolume: React.Dispatch<React.SetStateAction<number>>;
  sfxMutedIOS: boolean;
  setSfxMutedIOS: React.Dispatch<React.SetStateAction<boolean>>;
  saveSettings: () => void;
  resetGameData: () => void;
  totalClicks: number;
  totalMoney: number;
  setTotalClicks: React.Dispatch<React.SetStateAction<number>>;
  saveStats: () => void;
  achievements: Achievement[];
  timeInGame: number;
}

type Achievement = {
  id: string;
  name: string;
  icon: string;
  description: string;
  value: number;
  date?: Date; // Optional, can be used to store the date when the achievement was unlocked
};

type AchievementsTab = {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  list: Achievement[];
};
