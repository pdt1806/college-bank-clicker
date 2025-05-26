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
  increment: (amount?: number) => void;
  perSecond: number;
  buyUpgrade: (upgrade: AutomaticUpgrade) => void;
  countUpgrade: (upgrade: AutomaticUpgrade) => number;
  currentCost: (upgrade: AutomaticUpgrade) => number;
  perClick: number;
  saveGame: () => void;
  // resetData: () => void;
}
