import useSound from "use-sound";
import { sfx } from "../utils/audio";
import { SettingsDataStore } from "./Stores/SettingsDataStore";

type SoundName = keyof typeof sfx;

type SoundMapType = Record<SoundName, () => void>;

const soundMap: SoundMapType = Object.fromEntries(
  Object.entries(sfx).map(([key, _]) => [key, () => {}]),
) as SoundMapType;

export default function GlobalSounds() {
  const sfxVolume = SettingsDataStore((state) => state.sfxVolume);
  const sfxMutedIOS = SettingsDataStore((state) => state.sfxMutedIOS);

  const soundHooks = Object.fromEntries(
    Object.entries(sfx).map(([key, src]) => [
      key,
      useSound(src, {
        volume: sfxVolume / 100,
        soundEnabled: !sfxMutedIOS,
      })[0],
    ]),
  ) as SoundMapType;

  Object.keys(soundMap).forEach((key) => {
    soundMap[key as SoundName] = soundHooks[key as SoundName];
  });

  return null;
}

export const playSound = (soundName: SoundName) => {
  if (soundMap[soundName]) soundMap[soundName]();
};
