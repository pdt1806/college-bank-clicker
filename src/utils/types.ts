type Upgrade = {
  id: string;
  name: string;
  cost: number;
};

interface GameContextType {
  students: number;
  setStudents: React.Dispatch<React.SetStateAction<number>>;
  increment: (amount?: number) => void;
  perSecond: number;
  setPerSecond: React.Dispatch<React.SetStateAction<number>>;
  upgrades: Upgrade[];
  setUpgrades: React.Dispatch<React.SetStateAction<Upgrade[]>>;
}
