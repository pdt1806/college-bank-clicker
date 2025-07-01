import { useIdle } from "@mantine/hooks";
import { useEffect, useRef } from "react";
import { GAME_CURSORS, INDEXED_DB_NAME } from "../utils/const";
import { injectCursorsToDOM } from "./GameActions";
import { audio } from "./SoundManager";
import { GameDataStore } from "./Stores/GameDataStore";
import { InventoryDataStore } from "./Stores/InventoryDataStore";
import { SettingsDataStore } from "./Stores/SettingsDataStore";
import { StatsDataStore } from "./Stores/StatsDataStore";

export const GameEffects = () => {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  // --------------------
  // BGM & SFX Logic

  useEffect(() => {
    if (!bgmRef.current) {
      bgmRef.current = new Audio(audio.bgm);
      bgmRef.current.loop = true;
    }

    const bgm = bgmRef.current;
    const { musicVolume, musicMutedIOS } = SettingsDataStore.getState();
    bgm.muted = musicMutedIOS;
    bgm.volume = musicVolume / 100;

    document.body.addEventListener("click", () => {
      bgm.play().catch((err) => console.error("Playback failed:", err));
    });

    return () => {
      bgm.pause();
    };
  }, []);

  useEffect(() => {
    const unsub = SettingsDataStore.subscribe((state) => {
      const { musicVolume, musicMutedIOS, saveSettings } = state;
      const bgm = bgmRef.current;
      if (!bgm) return;
      bgm.volume = musicVolume / 100;
      bgm.muted = musicMutedIOS;
      saveSettings();
    });

    return unsub;
  }, []);

  // Offline mode logic (item required)
  // Add money
  useEffect(() => {
    const { inventory } = InventoryDataStore.getState();
    const { money, setMoney, perSecond } = GameDataStore.getState();
    const { totalMoney, setTotalMoney } = StatsDataStore.getState();

    const offlineMode = Object.keys(inventory).includes("item-offline-earning-upgrade-50");

    if (!offlineMode || perSecond == 0) return;
    const lastAccess = sessionStorage.getItem("lastAccess");
    if (!lastAccess) return;

    const lastAccessDate = new Date(lastAccess);
    const currentTime = new Date();
    const timeDiff = Math.floor((currentTime.getTime() - lastAccessDate.getTime()) / 1000); // in seconds
    if (timeDiff > 0 && perSecond > 0) {
      const earned = perSecond * timeDiff;
      setMoney(money + earned);
      setTotalMoney(totalMoney + earned);
    }
  }, []);

  // Double per second when idle logic
  const idle = useIdle(5 * 60 * 1000); // 5 minutes in milliseconds;
  useEffect(() => {
    const inventoryList = Object.keys(InventoryDataStore.getState().inventory);
    if (!inventoryList.includes("item-double-per-second-when-idle")) return;

    const { setSecondMultiplier } = GameDataStore.getState();
    if (idle) setSecondMultiplier(2);
    else setSecondMultiplier(1);
  }, [idle]);

  // Increment money logic
  // using RAF + TPS for smooth updates & saving battery
  useEffect(() => {
    let lastFrameTime = performance.now();
    let wasPerSecondZero = true;
    let animationFrameId: number;

    const tick = (now: number) => {
      const { perSecond, incrementMoney, secondMultiplier } = GameDataStore.getState();

      if (perSecond > 0) {
        if (wasPerSecondZero) {
          // reset lastFrameTime to now so that delta doesn't count the time when perSecond was zero
          lastFrameTime = now;
          wasPerSecondZero = false;
        }

        const { incrementTotalMoney } = StatsDataStore.getState();
        const { TPS } = SettingsDataStore.getState();

        const frameDuration = 1000 / TPS;
        const delta = now - lastFrameTime;

        if (delta >= frameDuration) {
          lastFrameTime = now;

          const deltaSeconds = delta / 1000;
          const earned = perSecond * deltaSeconds * secondMultiplier;

          incrementMoney(earned);
          incrementTotalMoney(earned);
        }
      } else {
        !wasPerSecondZero && (wasPerSecondZero = true);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Save game interval - runs every second
  useEffect(() => {
    const interval = setInterval(() => {
      const { saveGame } = GameDataStore.getState();
      const { incrementTimeInGame, saveStats, setLastAccess } = StatsDataStore.getState();

      saveGame();
      setLastAccess(new Date());
      incrementTimeInGame(1);

      saveStats();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Set max money
  useEffect(() => {
    const unsub = GameDataStore.subscribe((state) => {
      const { maxMoney, setMaxMoney } = StatsDataStore.getState();

      const currentMoney = state.money;
      if (currentMoney > maxMoney) setMaxMoney(currentMoney);
    });

    return unsub;
  }, []);

  // Load custom cursors from iDB if there are, then inject them into the DOM
  useEffect(() => {
    const dbReq = indexedDB.open(INDEXED_DB_NAME, 1);

    dbReq.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("images")) {
        db.createObjectStore("images");
        injectCursorsToDOM({
          defaultURL: GAME_CURSORS.default,
          pointerURL: GAME_CURSORS.pointer,
        });
        return;
      }
    };

    dbReq.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      const tx = db.transaction("images", "readonly");
      const store = tx.objectStore("images");

      const defaultCursorReq = store.get("cursor-default");
      const pointerCursorReq = store.get("cursor-pointer");

      defaultCursorReq.onsuccess = () => {
        const defaultCursor = defaultCursorReq.result as Blob | undefined;
        if (defaultCursor)
          injectCursorsToDOM({
            defaultURL: URL.createObjectURL(defaultCursor),
          });
        else
          injectCursorsToDOM({
            defaultURL: GAME_CURSORS.default,
          });
      };

      defaultCursorReq.onerror = (event) => {
        injectCursorsToDOM({
          defaultURL: GAME_CURSORS.default,
        });
        console.error("Error fetching default cursor:", (event.target as IDBRequest).error);
      };

      pointerCursorReq.onsuccess = () => {
        const pointerCursor = pointerCursorReq.result as Blob | undefined;
        if (pointerCursor)
          injectCursorsToDOM({
            pointerURL: URL.createObjectURL(pointerCursor),
          });
        else
          injectCursorsToDOM({
            pointerURL: GAME_CURSORS.pointer,
          });
      };

      pointerCursorReq.onerror = (event) => {
        injectCursorsToDOM({
          pointerURL: GAME_CURSORS.pointer,
        });
        console.error("Error fetching pointer cursor:", (event.target as IDBRequest).error);
      };
    };

    dbReq.onerror = (event) => {
      injectCursorsToDOM({
        defaultURL: GAME_CURSORS.default,
        pointerURL: GAME_CURSORS.pointer,
      });
      console.error("Error opening IndexedDB:", (event.target as IDBOpenDBRequest).error);
    };
  }, []);

  return null;
};
