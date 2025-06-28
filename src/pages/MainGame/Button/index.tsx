import { Box, Center } from "@mantine/core";
import { memo, useRef } from "react";
import { increment } from "../../../GameProvider/GameActions";
import { playSound } from "../../../GameProvider/SoundManager";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
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

  return (
    <Center h="100%" w="100%">
      <Box className={classes.wrapper} ref={containerRef}>
        <Box
          onClick={(e) => {
            animate(e);
            increment();
            playSound("pop2");
          }}
          className={`${classes.image} cursor-pointer`}
        />
      </Box>
    </Center>
  );
};

export default memo(MainGameButton);
