import { create } from "zustand";
import { bgm } from "../../utils/audio";
import { BGMTrack, SettingsDataState } from "../../utils/types";

const settingsData = localStorage.getItem("settingsData");
const parsedSettingsData = settingsData ? JSON.parse(settingsData) : {};

export const SettingsDataStore = create<SettingsDataState>()((set) => ({
  musicVolume: parsedSettingsData.musicVolume ?? 50,
  sfxVolume: parsedSettingsData.sfxVolume ?? 50,
  musicMutedIOS: parsedSettingsData.musicMutedIOS ?? false,
  sfxMutedIOS: parsedSettingsData.sfxMutedIOS ?? false,
  TPS: parsedSettingsData.TPS ?? 25,
  // offlineMode: parsedSettingsData.offlineMode ?? true,
  currentBGM: parsedSettingsData.currentBGM ?? bgm["Other"][0],

  setMusicVolume: (musicVolume: number) => set({ musicVolume }),
  setSfxVolume: (sfxVolume: number) => set({ sfxVolume }),
  setMusicMutedIOS: (musicMutedIOS: boolean) => set({ musicMutedIOS }),
  setSfxMutedIOS: (sfxMutedIOS: boolean) => set({ sfxMutedIOS }),
  setTPS: (TPS: number) => set({ TPS }),
  // setOfflineMode: (offlineMode: boolean) => set({ offlineMode }),
  setCurrentBGM: (currentBGM: BGMTrack) => set({ currentBGM }),

  saveSettings: () => {
    const state = SettingsDataStore.getState();
    localStorage.setItem(
      "settingsData",
      JSON.stringify({
        musicVolume: state.musicVolume,
        sfxVolume: state.sfxVolume,
        musicMutedIOS: state.musicMutedIOS,
        sfxMutedIOS: state.sfxMutedIOS,
        TPS: state.TPS,
        // offlineMode: state.offlineMode,
        currentBGM: state.currentBGM,
      }),
    );
  },
}));
