import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { audio } from "../../utils/audio";

export const SettingsDataContext = createContext<SettingsDataContextType>({} as SettingsDataContextType);

export const SettingsDataProvider = ({ children }: { children: ReactNode }) => {
  const [musicVolume, setMusicVolume] = useState(50);
  const [sfxVolume, setSfxVolume] = useState(50);
  const [musicMutedIOS, setMusicMutedIOS] = useState(false);
  const [sfxMutedIOS, setSfxMutedIOS] = useState(false);

  // --------------------
  // State Ref for Settings Data

  const settingsData = useRef({ musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS });

  useEffect(() => {
    settingsData.current = { musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS };
  }, [musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS]);

  // --------------------
  // BGM & SFX Logic

  const bgm = audio.bgm;
  bgm.loop = true;
  bgm.muted = musicMutedIOS;
  bgm.volume = musicVolume / 100;

  document.body.addEventListener("click", () => {
    bgm.play().catch((err) => console.error("Playback failed:", err));
  });

  useEffect(() => {
    bgm.volume = musicVolume / 100;
    bgm.muted = musicMutedIOS;
  }, [musicVolume, musicMutedIOS]);

  // --------------------
  // Functions

  const playSound = (audio: HTMLAudioElement) => {
    const sound = new Audio(audio.src);
    sound.muted = sfxMutedIOS;
    sound.volume = sfxVolume / 100;
    sound.play().catch((error) => {
      console.error("Error playing audio:", error);
    });
  };

  const saveSettings = () => localStorage.setItem("settingsData", JSON.stringify(settingsData.current));

  // --------------------
  // React Hooks

  // Init settings data
  useEffect(() => {
    const savedSettings = localStorage.getItem("settingsData");
    if (savedSettings) {
      const { musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS } = JSON.parse(savedSettings);
      setMusicVolume(musicVolume);
      setSfxVolume(sfxVolume);
      setMusicMutedIOS(musicMutedIOS);
      setSfxMutedIOS(sfxMutedIOS);
    }
  }, []);

  // Save settings on change
  useEffect(saveSettings, [musicVolume, sfxVolume, musicMutedIOS, sfxMutedIOS]);

  return (
    <SettingsDataContext.Provider
      value={{
        musicVolume,
        setMusicVolume,
        musicMutedIOS,
        setMusicMutedIOS,
        sfxVolume,
        setSfxVolume,
        sfxMutedIOS,
        setSfxMutedIOS,
        saveSettings,
        playSound,
      }}
    >
      {children}
    </SettingsDataContext.Provider>
  );
};

export const useSettingsData = (): SettingsDataContextType => {
  const context = useContext(SettingsDataContext);
  if (!context) throw new Error("useSettingsData must be used within a GameProvider");
  return context;
};
