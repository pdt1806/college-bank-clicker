import { notifications } from "@mantine/notifications";
import { Icon, IconBackpack, IconExclamationCircleFilled, IconProps, IconStar, IconUpload } from "@tabler/icons-react";
import { readAndCompressImage } from "browser-image-resizer";
import { allAchievements } from "../utils/achievements";
import { GAME_CURSORS, INDEXED_DB_NAME } from "../utils/const";
import { inventoryItems } from "../utils/inventory";
import { playSound } from "./SoundManager";
import { AchievementsDataStore } from "./Stores/AchievementsDataStore";
import { GameDataStore } from "./Stores/GameDataStore";
import { InventoryDataStore } from "./Stores/InventoryDataStore";
import { StatsDataStore } from "./Stores/StatsDataStore";

export const increment = () => {
  const { incrementMoney, perClick, saveGame } = GameDataStore.getState();
  incrementMoney(perClick);
  saveGame();

  const { incrementTotalMoney, incrementTotalClicks } = StatsDataStore.getState();
  incrementTotalMoney(perClick);
  incrementTotalClicks(1);
};

export const buyUpgrade = (upgrade: Upgrade) => {
  const { money, perSecond, perClick, decrementMoney, setPerSecond, setPerClick, upgrades, setUpgrades, saveGame } =
    GameDataStore.getState();

  const { saveStats } = StatsDataStore.getState();

  const updateUpgrades = () => {
    const currentUpgrades = upgrades[upgrade.id] || 0;
    const newUpgrades = {
      ...upgrades,
      [upgrade.id]: currentUpgrades + 1,
    } as UpgradeListType;
    setUpgrades(newUpgrades);
  };

  // ---

  const currentUpgradeCost = currentCost(upgrade);
  if (money >= currentUpgradeCost) {
    playSound("upgrade");
    decrementMoney(currentUpgradeCost);
    upgrade.perSecond && setPerSecond(perSecond + (upgrade.perSecond ?? 0));
    upgrade.perClick && setPerClick(perClick + (upgrade.perClick ?? 0));
    updateUpgrades();
  }
  saveGame();
  saveStats();
};

export const countUpgrade = (upgrade: Upgrade | string) => {
  const id = typeof upgrade === "string" ? upgrade : upgrade.id;
  const { upgrades } = GameDataStore.getState();
  return upgrades[id] ?? 0;
};

export const currentCost = (upgrade: Upgrade) => {
  if (upgrade.costMultiplier === undefined) return upgrade.cost;
  return Math.floor(upgrade.cost * Math.pow(upgrade.costMultiplier ?? 1, countUpgrade(upgrade)));
};

export const resetAllGame = () => {
  const { resetGame } = GameDataStore.getState();
  const { resetAchievements } = AchievementsDataStore.getState();
  const { resetStats } = StatsDataStore.getState();
  const { resetInventory } = InventoryDataStore.getState();
  resetGame();
  resetAchievements();
  resetStats();
  resetInventory();
};

const saveAllGame = () => {
  const { saveGame } = GameDataStore.getState();
  const { saveStats } = StatsDataStore.getState();
  const { saveAchievements } = AchievementsDataStore.getState();
  const { saveInventory } = InventoryDataStore.getState();
  saveGame();
  saveStats();
  saveAchievements();
  saveInventory();
};

export const exportAllGame = () => {
  saveAllGame();
  const data = {
    gameData: localStorage.getItem("gameData"),
    statsData: localStorage.getItem("statsData"),
    achievementsData: localStorage.getItem("achievementsData"),
    inventoryData: localStorage.getItem("inventoryData"),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "college-bank-clicker-export-" + new Date().toISOString() + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const checkGameDataAuthenticity = (data: any) => {
  if (!data || typeof data !== "object") return "Invalid game data format.";

  try {
    JSON.parse(data.gameData);
    JSON.parse(data.statsData);
    JSON.parse(data.achievementsData || "{}");
    JSON.parse(data.inventoryData || "{}");
  } catch (error) {
    return "Invalid game data structure. Please ensure the file is a valid game data file.";
  }

  if (!data.gameData) return "Game data is missing.";
  if (!data.statsData) return "Stats data is missing.";

  return null; // Data is valid
};

export const importAllGame = (file: File | null) => {
  if (!file) return;

  const { setMoney, setPerSecond, setPerClick, setUpgrades, saveGame } = GameDataStore.getState();

  const { setTotalClicks, setTotalMoney, setTimeInGame, setMaxMoney, saveStats } = StatsDataStore.getState();

  const { setAchievements, saveAchievements } = AchievementsDataStore.getState();

  const { setInventory, saveInventory } = InventoryDataStore.getState();

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target?.result as string);

      const invalid = checkGameDataAuthenticity(data);
      if (invalid) throw new Error(invalid);

      const { money, perSecond, perClick, upgrades } = JSON.parse(data.gameData);
      setMoney(money);
      setPerSecond(perSecond);
      setUpgrades(upgrades);
      setPerClick(perClick);

      const { totalClicks, totalMoney, timeInGame, maxMoney } = JSON.parse(data.statsData);
      setTotalClicks(totalClicks);
      setTotalMoney(totalMoney);
      setTimeInGame(timeInGame);
      setMaxMoney(maxMoney);

      const achievements = JSON.parse(data.achievementsData || "{}");
      setAchievements(achievements);

      const inventory = JSON.parse(data.inventoryData || "{}");
      setInventory(inventory);

      saveGame();
      saveStats();
      saveAchievements();
      saveInventory();

      notifications.show({
        radius: "lg",
        styles: { title: { color: "var(--mantine-color-cbc-purple-9)" } },
        title: "Import Successful",
        message: "Game data has been successfully imported.",
        color: "cbc-green",
        autoClose: 3000,
        icon: <IconUpload size={24} />,
      });
    } catch (error: any) {
      return notifications.show({
        radius: "lg",
        styles: { title: { color: "var(--mantine-color-cbc-purple-9)" } },
        title: "Import Failed",
        message: error.message ?? "An error occurred while importing game data.",
        color: "red",
        autoClose: 5000,
        icon: <IconExclamationCircleFilled size={24} />,
      });
    }
  };
  reader.readAsText(file);
};

export const updateCursor = (type: string, file: File): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(INDEXED_DB_NAME, 1);

    request.onsuccess = async (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      try {
        const resizedBlob = await readAndCompressImage(file, {
          quality: 1,
          maxWidth: 32,
          maxHeight: 32,
          debug: false,
          mimeType: "image/png",
        });

        const cursorURL = URL.createObjectURL(resizedBlob);

        const transaction = db.transaction("images", "readwrite");
        const store = transaction.objectStore("images");
        store.put(resizedBlob, "cursor-" + type);

        transaction.oncomplete = () => {
          console.log("Cursor updated successfully for type: " + type);

          if (type === "default") injectCursorsToDOM({ defaultURL: cursorURL });
          else if (type === "pointer") injectCursorsToDOM({ pointerURL: cursorURL });
          else console.warn("Unknown cursor type: " + type);

          resolve(cursorURL); // return the result here
        };

        transaction.onerror = () => {
          reject(transaction.error);
        };
      } catch (err) {
        reject(err);
      }
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
};

export const resetCursor = (type: string) => {
  console.log("Resetting cursor for type: " + type);

  const request = indexedDB.open(INDEXED_DB_NAME, 1);

  request.onsuccess = (event) => {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction("images", "readwrite");
    const store = transaction.objectStore("images");
    store.delete("cursor-" + type);

    transaction.oncomplete = () => {
      switch (type) {
        case "default":
          injectCursorsToDOM({ defaultURL: GAME_CURSORS.default });
          break;
        case "pointer":
          injectCursorsToDOM({ pointerURL: GAME_CURSORS.pointer });
          break;
        default:
          console.warn("Unknown cursor type for reset: " + type);
      }
    };

    transaction.onerror = () => {
      console.error("Failed to reset cursor for type:", type, transaction.error);
    };
  };

  request.onerror = (event) => {
    console.error("IndexedDB error while resetting cursor:", (event.target as IDBOpenDBRequest).error);
  };
};

export const injectCursorsToDOM = ({ defaultURL, pointerURL }: { defaultURL?: string; pointerURL?: string } = {}) => {
  if (defaultURL) {
    const defaultId = "cursor-default-style";
    const existingStyle = document.getElementById(defaultId);
    if (existingStyle) existingStyle.remove();
    const style = document.createElement("style");
    style.id = defaultId;
    style.innerHTML = `
      html,
      body,
      #root, .cursor-default {
        cursor: url("${defaultURL}"), auto;
      }
    `;
    document.head.appendChild(style);
    sessionStorage.setItem("defaultCursorURL", defaultURL);
  }
  if (pointerURL) {
    const pointerId = "cursor-pointer-style";
    const existingStyle = document.getElementById(pointerId);
    if (existingStyle) existingStyle.remove();
    const style = document.createElement("style");
    style.id = pointerId;
    style.innerHTML = `
      button,
      [role="button"],
      a, .cursor-pointer {
        cursor: url("${pointerURL}"), auto !important;
      }
    `;
    document.head.appendChild(style);
    sessionStorage.setItem("pointerCursorURL", pointerURL);
  }
};

// -- Add an entry to achievements or inventory

type AddEntryOptions<T extends { id: string; name: string; date?: Date }> = {
  entry: T | string;
  allEntries: T[];
  store: {
    getState: () => {
      data: Record<string, Date>;
      setData: (newData: Record<string, Date>) => void;
      saveData: () => void;
    };
  };
  typeLabel: string;
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  color: string;
  soundId: string;
};

const addEntry = <T extends { id: string; name: string; date?: Date }>(options: AddEntryOptions<T>) => {
  const { entry, allEntries, store, typeLabel, icon, color, soundId } = options;
  const { data, setData, saveData } = store.getState();

  let actualEntry = typeof entry === "string" ? allEntries.find((e) => e.id === entry) : entry;

  if (!actualEntry) {
    console.warn(`${typeLabel} with id "${entry}" not found.`);
    return;
  }

  if (!data[actualEntry.id]) {
    const newData = {
      ...data,
      [actualEntry.id]: actualEntry.date ?? new Date(),
    };
    setData(newData);
    saveData();
    playSound(soundId);
    const NotiIcon = icon;
    notifications.show({
      radius: "lg",
      styles: { title: { color: "var(--mantine-color-cbc-purple-9)" } },
      title: `${typeLabel} Unlocked!`,
      message: actualEntry.name,
      color: color,
      autoClose: 5000,
      position: "top-right",
      icon: <NotiIcon size={24} />,
    });
  }
};

export const addAchievement = (achievement: Achievement | string) => {
  addEntry({
    entry: achievement,
    allEntries: allAchievements,
    store: {
      getState: () => {
        const { achievements, setAchievements, saveAchievements } = AchievementsDataStore.getState();
        return {
          data: achievements,
          setData: setAchievements,
          saveData: saveAchievements,
        };
      },
    },
    icon: IconStar,
    color: "cbc-green",
    soundId: "achievement",
    typeLabel: "Achievement",
  });
};

export const addInventoryItem = (item: InventoryItem | string) => {
  addEntry({
    entry: item,
    allEntries: inventoryItems,
    store: {
      getState: () => {
        const { inventory, setInventory, saveInventory } = InventoryDataStore.getState();
        return {
          data: inventory,
          setData: setInventory,
          saveData: saveInventory,
        };
      },
    },
    icon: IconBackpack,
    color: "cbc-yellow",
    soundId: "achievement",
    typeLabel: "Inventory Item",
  });
};

// ------
