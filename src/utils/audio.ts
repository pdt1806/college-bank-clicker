export const audio: Record<string, HTMLAudioElement> = {
  upgrade: new Audio("/assets/audio/upgrade.mp3"),
  bgm: new Audio("/assets/audio/bgm.mp3"),
  achievement: new Audio("/assets/audio/achievement.mp3"),
  isReached: new Audio("/assets/audio/is_reached.mp3"),
  pop: new Audio("/assets/audio/pop.mp3"),
  pop2: new Audio("/assets/audio/pop_2.mp3"), // money button
  pop3: new Audio("/assets/audio/pop_3.mp3"), // navigation
  dropdown: new Audio("/assets/audio/dropdown.mp3"),
};

for (const key in audio) {
  audio[key].preload = "auto";
  // audio[key].oncanplaythrough = () => {
  //   console.log(`${key} audio loaded successfully.`);
  // };
  audio[key].onerror = (error) => {
    console.error(`Error loading ${key} audio:`, error);
  };
}
