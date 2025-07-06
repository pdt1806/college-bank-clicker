import { InventoryItem } from "./types";

export const inventoryItems: InventoryItem[] = [
  {
    id: "item-click-100x",
    name: "Mechanical Pencil of Destiny",
    description: "You have a 0.1% chance to get 100x money from a click.",
    method: "Collect by clicking 1000 times.",
  }, // done
  {
    id: "item-double-next-20-every-200",
    name: "Giant Barron's Book",
    description: "Every 200 clicks boosts next 20 clicks by 2x.",
    method: "Collect by upgrading each manual upgrade to level 20.",
  }, // done
  {
    id: "item-0.3-percent-chance-triple-30-secs",
    name: "Leaked Group Chat",
    description: "You have a 0.3% chance to triple your income for 30 seconds.",
    method: "Collect by upgrading each automatic upgrade to level 30.",
  }, // done
  {
    id: "item-spike-3x-random",
    name: "Crypto Wallet",
    description: "Randomly fluctuates, can spike earnings by 3x occasionally.",
    method: "Collect by reaching 1,000,000 total money earned.",
  }, // done
  {
    id: "item-double-per-second-when-idle",
    name: "Black Card",
    description: "Doubles money earned per second when idle (not when offline though).",
    method: "Collect by reaching 10,000,000 total money earned.",
  }, // done
  {
    id: "item-boost-2-for-50-clicks",
    name: "Miraculous AP Curve",
    description: "Randomly gives 2x boost to your income per click for 50 clicks.",
    method: "Collect by buying any of these upgrades 13 times: AP Physics 1, AP Chemistry, AP U.S. History.",
  }, // done
  {
    id: "item-achievements-5",
    name: "AP Score Calculator",
    description: "Increases achievement rewards by 20%.",
    method: "Collect by unlocking 5 achievements.",
  }, // done
  {
    id: "item-achievements-10",
    name: "Extra Credit",
    description: "Increases achievement rewards by 50%.",
    method: "Collect by unlocking 10 achievements.",
  }, // done
  {
    id: "item-achievements-20",
    name: "FRQ Grader's Mercy",
    description: "Doubles rewards from achievements.",
    method: "Collect by unlocking 20 achievements.",
  }, // done
  {
    id: "item-offline-earning-upgrade-50",
    name: "5 Score Shrine",
    description: "You earn your money even while offline.",
    method: "Collect by upgrading each upgrade to level 50.",
  }, // done
];
