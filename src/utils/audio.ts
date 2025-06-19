export const audio: Record<string, HTMLAudioElement> = {
  upgrade: new Audio("/assets/audio/upgrade.mp3"),
  bgm: new Audio("/assets/audio/bgm.mp3"),
  achievement: new Audio("/assets/audio/achievement.mp3"),
};

for (const key in audio) {
  audio[key].preload = "auto";
  audio[key].oncanplaythrough = () => {
    console.log(`${key} audio loaded successfully.`);
  };
  audio[key].onerror = (error) => {
    console.error(`Error loading ${key} audio:`, error);
  };
}
