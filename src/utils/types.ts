import { DiscordSDK } from "@discord/embedded-app-sdk";

export type GeneralUpgrade = {
  id: string;
  name: string;
  cost: number;
  costMultiplier: number;
  description: string;
};

export type AutomaticUpgrade = GeneralUpgrade & {
  perSecond?: number;
};

export type ManualUpgrade = GeneralUpgrade & {
  perClick?: number;
};

export type Upgrade = AutomaticUpgrade & ManualUpgrade;

export type UpgradeListType = {
  [key: string]: number;
};

export type Achievement = {
  id: string;
  name: string;
  description: string;
  message: string;
  value?: number;
  reward: AchievementReward;
  date?: Date;
};

export type AchievementReward = {
  value: number;
  type: "money" | "perClick" | "perSecond";
};

export type AchievementsTab = {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  list: Achievement[];
};

export type AchievementListType = {
  [key: string]: Date;
};

export type InventoryListType = {
  [key: string]: Date;
};

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  value: string;
}

export interface UpgradeBarTab {
  name: string;
  icon: React.FC<{ size?: number; color?: string }>;
  description: string;
  list: Upgrade[];
}

export interface GameDataState {
  money: number;
  perSecond: number;
  perClick: number;
  upgrades: UpgradeListType;
  boostedClicks: number;
  clickMultiplier: number;
  secondMultiplier: number;
  setMoney: (money: number) => void;
  setPerSecond: (perSecond: number) => void;
  setPerClick: (perClick: number) => void;
  setUpgrades: (upgrades: UpgradeListType) => void;
  setBoostedClicks: (boostedClicks: number) => void;
  setClickMultiplier: (clickMultiplier: number) => void;
  setSecondMultiplier: (secondMultiplier: number) => void;
  incrementMoney: (amount: number) => void;
  decrementMoney: (amount: number) => void;
  incrementPerClick: (amount: number) => void;
  incrementPerSecond: (amount: number) => void;
  saveGame: () => void;
  resetGame: () => void;
}

export interface SettingsDataState {
  musicVolume: number;
  sfxVolume: number;
  musicMutedIOS: boolean;
  sfxMutedIOS: boolean;
  TPS: number;
  // offlineMode: boolean;
  setMusicVolume: (musicVolume: number) => void;
  setSfxVolume: (sfxVolume: number) => void;
  setMusicMutedIOS: (musicMutedIOS: boolean) => void;
  setSfxMutedIOS: (sfxMutedIOS: boolean) => void;
  setTPS: (TPS: number) => void;
  // setOfflineMode: (offlineMode: boolean) => void;
  saveSettings: () => void;
}

export interface SidebarsState {
  asideOpened: boolean;
  navbarOpened: boolean;
  toggleAside: () => void;
  closeAside: () => void;
  toggleNavbar: () => void;
  closeNavbar: () => void;
}

export interface StatsDataState {
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

  incrementTotalClicks: (number: number) => void;
  incrementTotalMoney: (number: number) => void;
  incrementTimeInGame: (number: number) => void;

  saveStats: () => void;
  resetStats: () => void;
}

export interface AchievementsDataState {
  achievements: AchievementListType;
  achievementRewardMultiplier: number;
  setAchievements: (achievements: AchievementListType) => void;
  setAchievementRewardMultiplier: (multiplier: number) => void;
  saveAchievements: () => void;
  resetAchievements: () => void;
}

export interface InventoryDataState {
  inventory: InventoryListType;
  setInventory: (inventory: InventoryListType) => void;
  saveInventory: () => void;
  resetInventory: () => void;
}

export interface DiscordStoreState {
  discordSdk: DiscordSDK | null;
  isInDiscord: boolean;
  user: DiscordUserType | null;
  currentPage: string;
  sessionId: string;
  setDiscordSdk: (discordSdk: DiscordSDK) => void;
  setIsInDiscord: (isInDiscord: boolean) => void;
  setUser: (user: DiscordUserType | null) => void;
  setCurrentPage: (page: string) => void;
  setSessionId: (sessionId: string) => void;
}

export type DiscordUserType = {
  username: string;
  discriminator: string;
  id: string;
  public_flags: number;
  avatar?: string | null | undefined;
  global_name?: string | null | undefined;
};

export interface OutletContext {
  asideOpened: boolean;
  navbarOpened: boolean;
}

export type NavbarLinkType = {
  label: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
  to: string;
};

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  method: string;
  date?: Date;
}

export type ExportGameDataType = {
  gameData: GameDataState | null;
  statsData: StatsDataState | null;
  achievementsData: AchievementsDataState | null;
  inventoryData: InventoryDataState | null;
};
