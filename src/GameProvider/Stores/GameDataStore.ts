import { create } from "zustand";

const savedGame = localStorage.getItem("gameData");
const parsedGameData = savedGame ? JSON.parse(savedGame) : {};

export const GameDataStore = create<GameDataState>()((set) => ({
  money: parsedGameData.money ?? 0,
  perSecond: parsedGameData.perSecond ?? 0.0,
  perClick: parsedGameData.perClick ?? 1,
  upgrades: parsedGameData.upgrades ?? {},

  boostedClicks: 0,

  clickMultiplier: 1,
  secondMultiplier: 1,

  setMoney: (money: number) => set({ money }),
  setPerSecond: (perSecond: number) => set({ perSecond }),
  setPerClick: (perClick: number) => set({ perClick }),
  setUpgrades: (upgrades: UpgradeListType) => set({ upgrades }),

  setBoostedClicks: (boostedClicks: number) => set({ boostedClicks }),

  setClickMultiplier: (clickMultiplier: number) => set({ clickMultiplier }),
  setSecondMultiplier: (secondMultiplier: number) => set({ secondMultiplier }),

  incrementMoney: (amount: number) => set((state) => ({ money: state.money + amount })),
  decrementMoney: (amount: number) => set((state) => ({ money: Math.max(0, state.money - amount) })),

  incrementPerClick: (amount: number) => set((state) => ({ perClick: state.perClick + amount })),
  incrementPerSecond: (amount: number) => set((state) => ({ perSecond: state.perSecond + amount })),

  saveGame: () => {
    const state = GameDataStore.getState();
    localStorage.setItem(
      "gameData",
      JSON.stringify({
        money: state.money,
        perSecond: state.perSecond,
        perClick: state.perClick,
        upgrades: state.upgrades,
      })
    );
  },

  resetGame: () => {
    set({
      money: 0,
      perSecond: 0,
      perClick: 1,
      upgrades: {},
    });
    localStorage.removeItem("gameData");
  },
}));
