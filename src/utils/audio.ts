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

// for (const key in audio) {
//   audio[key].preload = "auto";
//   // audio[key].oncanplaythrough = () => {
//   //   console.log(`${key} audio loaded successfully.`);
//   // };
//   audio[key].onerror = (error) => {
//     console.error(`Error loading ${key} audio:`, error);
//   };
// }
