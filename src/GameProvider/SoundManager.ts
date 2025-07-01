import useSound from "use-sound";
import { SettingsDataStore } from "./Stores/SettingsDataStore";

export const audio: Record<string, string> = {
  upgrade: "/assets/audio/upgrade.mp3",
  bgm: "/assets/audio/bgm.mp3",
  achievement: "/assets/audio/achievement.mp3",
  isReached: "/assets/audio/is_reached.mp3",
  pop: "/assets/audio/pop.mp3",
  pop2: "/assets/audio/pop_2.mp3", // money button
  pop3: "/assets/audio/pop_3.mp3", // navigation
  dropdown: "/assets/audio/dropdown.mp3",
};

type SoundName = keyof typeof audio;

type SoundMapType = Record<SoundName, () => void>;

const soundMap: SoundMapType = Object.fromEntries(
  Object.entries(audio).map(([key, _]) => [key, () => {}])
) as SoundMapType;

export default function GlobalSounds() {
  const sfxVolume = SettingsDataStore((state) => state.sfxVolume);
  const sfxMutedIOS = SettingsDataStore((state) => state.sfxMutedIOS);

  const soundHooks = Object.fromEntries(
    Object.entries(audio).map(([key, src]) => [
      key,
      useSound(src, {
        volume: sfxVolume / 100,
        soundEnabled: !sfxMutedIOS,
      })[0],
    ])
  ) as SoundMapType;

  Object.keys(soundMap).forEach((key) => {
    soundMap[key as SoundName] = soundHooks[key as SoundName];
  });

  return null;
}

export const playSound = (soundName: SoundName) => {
  if (soundMap[soundName]) soundMap[soundName]();
};
