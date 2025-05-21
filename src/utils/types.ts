type UpgradeType = {
  id: string;
  name: string;
  icon: string;
  cost: number;
  costList?: number[];
  perSecondIncrease: number;
  description: string;
};

interface GameContextType {
  money: number;
  setMoney: React.Dispatch<React.SetStateAction<number>>;
  increment: (amount?: number) => void;
  perSecond: number;
  setPerSecond: React.Dispatch<React.SetStateAction<number>>;
  upgrades: UpgradeType[];
  setUpgrades: React.Dispatch<React.SetStateAction<UpgradeType[]>>;
  buyUpgrade: (upgrade: UpgradeType) => void;
}
