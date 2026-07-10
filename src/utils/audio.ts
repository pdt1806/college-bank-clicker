import { BGMTrack } from "./types";

export const sfx: Record<string, string> = {
  upgrade: "/assets/audio/sfx/upgrade.mp3",
  achievement: "/assets/audio/sfx/achievement.mp3",
  isReached: "/assets/audio/sfx/is_reached.mp3",
  pop: "/assets/audio/sfx/pop.mp3",
  pop2: "/assets/audio/sfx/pop_2.mp3", // money button
  pop3: "/assets/audio/sfx/pop_3.mp3", // navigation
  dropdown: "/assets/audio/sfx/dropdown.mp3",
};

export const bgm: Record<string, BGMTrack[]> = {
  "Persona 4": [
    {
      title: "Heartbeat, Heartbreak",
      src: "/assets/audio/bgm/persona4/heartbeat_heartbreak.mp3",
    },
    {
      title: "New Days",
      src: "/assets/audio/bgm/persona4/new_days.mp3",
    },
    {
      title: "Reasoning",
      src: "/assets/audio/bgm/persona4/reasoning.mp3",
    },
    {
      title: "Signs Of Love",
      src: "/assets/audio/bgm/persona4/signs_of_love.mp3",
    },
    {
      title: "Your Affection",
      src: "/assets/audio/bgm/persona4/your_affection.mp3",
    },
    {
      title: "youthful lunch",
      src: "/assets/audio/bgm/persona4/youthful_lunch.mp3",
    },
    {
      title: "Game",
      src: "/assets/audio/bgm/persona4/game.mp3",
    },
  ],
  Other: [
    {
      title: "Usada Pekora BGM",
      src: "/assets/audio/bgm/other/pekora.mp3",
    },
  ],
};
