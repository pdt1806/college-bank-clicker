import { create } from "zustand";

const settingsData = localStorage.getItem("settingsData");
const parsedSettingsData = settingsData ? JSON.parse(settingsData) : {};

export const SettingsDataStore = create<SettingsDataState>()((set) => ({
  musicVolume: parsedSettingsData.musicVolume ?? 50,
  sfxVolume: parsedSettingsData.sfxVolume ?? 50,
  musicMutedIOS: parsedSettingsData.musicMutedIOS ?? false,
  sfxMutedIOS: parsedSettingsData.sfxMutedIOS ?? false,
  TPS: parsedSettingsData.TPS ?? 25,

  setMusicVolume: (musicVolume: number) => set({ musicVolume }),
  setSfxVolume: (sfxVolume: number) => set({ sfxVolume }),
  setMusicMutedIOS: (musicMutedIOS: boolean) => set({ musicMutedIOS }),
  setSfxMutedIOS: (sfxMutedIOS: boolean) => set({ sfxMutedIOS }),
  setTPS: (TPS: number) => set({ TPS }),

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
      })
    );
  },
}));
