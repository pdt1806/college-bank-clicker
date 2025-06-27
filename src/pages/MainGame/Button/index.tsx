import { Box, Center } from "@mantine/core";
import { memo, useRef } from "react";
import useSound from "use-sound";
import { increment } from "../../../GameProvider/GameActions";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
import { SettingsDataStore } from "../../../GameProvider/Stores/SettingsDataStore";
import { audio } from "../../../utils/audio";
import classes from "./index.module.css";

const MainGameButton = () => {
  const perClick = GameDataStore((state) => state.perClick);

  const containerRef = useRef<HTMLDivElement>(null);

  const animate = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const float = document.createElement("div");
    float.className = classes.floatingText;
    float.innerText = "+$" + perClick;

    float.style.left = `${e.nativeEvent.offsetX + (Math.random() * 20 - 10)}px`;
    float.style.top = `${e.nativeEvent.offsetY + (Math.random() * 10 - 5)}px`;

    container.appendChild(float);

    setTimeout(() => {
      container.removeChild(float);
    }, 1000);
  };

  const { sfxVolume } = SettingsDataStore.getState();
  const sfxMutedIOS = SettingsDataStore((state) => state.sfxMutedIOS);

  const [playSound] = useSound(audio.pop, {
    volume: sfxVolume / 100,
    soundEnabled: !sfxMutedIOS,
  });

  return (
    <Center h="100%" w="100%">
      <Box className={classes.wrapper} ref={containerRef}>
        <Box
          onClick={(e) => {
            animate(e);
            increment();
            playSound();
          }}
          className={`${classes.image} cursor-pointer`}
        />
      </Box>
    </Center>
  );
};

export default memo(MainGameButton);
