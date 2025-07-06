import { create } from "zustand";
import { InventoryDataState, InventoryListType } from "../../utils/types";

const inventoryData = localStorage.getItem("inventoryData");

export const InventoryDataStore = create<InventoryDataState>()((set) => ({
  inventory: inventoryData ? JSON.parse(inventoryData) : {},

  setInventory: (inventory: InventoryListType) => set({ inventory }),

  saveInventory: () => {
    const inventory = InventoryDataStore.getState().inventory;
    localStorage.setItem("inventoryData", JSON.stringify(inventory));
  },

  resetInventory: () => {
    set({ inventory: {} });
    localStorage.removeItem("inventoryData");
  },
}));
