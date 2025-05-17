type Upgrade = {
  id: string;
  name: string;
  cost: number;
};

interface GameContextType {
  students: number;
  setStudents: React.Dispatch<React.SetStateAction<number>>;
  increment: (amount?: number) => void;
  incrementAmount: number;
  setIncrementAmount: React.Dispatch<React.SetStateAction<number>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  decrementTime: (amount?: number) => void;
  upgrades: Upgrade[];
  setUpgrades: React.Dispatch<React.SetStateAction<Upgrade[]>>;
}
