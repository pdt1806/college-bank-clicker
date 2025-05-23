type GeneralUpgrade = {
  id: string;
  name: string;
  icon: string;
  cost: number;
  description: string;
};

type AutomaticUpgrade = GeneralUpgrade & {
  costFactor?: number;
  perSecond?: number;
};

type ManualUpgrade = GeneralUpgrade & {
  perClick?: number;
};

type Upgrade = AutomaticUpgrade & ManualUpgrade;

type UpgradeListType = {
  [key: string]: number;
}

interface GameContextType {
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
  increment: (amount?: number) => void;
  perSecond: number;
  setPerSecond: React.Dispatch<React.SetStateAction<number>>;
  upgrades: UpgradeListType;
  setUpgrades: React.Dispatch<React.SetStateAction<UpgradeListType>>;
  buyUpgrade: (upgrade: AutomaticUpgrade) => void;
  countUpgrade: (upgrade: AutomaticUpgrade) => number;
  currentCost: (upgrade: AutomaticUpgrade) => number;
}
