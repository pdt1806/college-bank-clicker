import { Box, Center, Image } from "@mantine/core";
import { memo, useRef, useState } from "react";
import { increment } from "../../../GameProvider/GameActions";
import { playSound } from "../../../GameProvider/SoundManager";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
import classes from "./index.module.css";

const MainGameButton = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const animate = (e: React.MouseEvent<HTMLDivElement>) => {
    const { perClick, clickMultiplier } = GameDataStore.getState();

    const container = containerRef.current;
    if (!container) return;

    const float = document.createElement("div");
    float.className = classes.floatingText;
    float.innerText = "+$" + (perClick * clickMultiplier).toLocaleString();

    float.style.left = `${e.nativeEvent.offsetX + (Math.random() * 20 - 10)}px`;
    float.style.top = `${e.nativeEvent.offsetY + (Math.random() * 10 - 5)}px`;

    container.appendChild(float);

    setTimeout(() => {
      container.removeChild(float);
    }, 1000);
  };

  const [isClicked, setIsClicked] = useState(false);

  return (
    <Center h="100%" w="100%">
      <Box
        className={`${classes.wrapper} cursor-pointer`}
        ref={containerRef}
        onClick={(e) => {
          animate(e);
          increment();
          playSound("pop2");
          setIsClicked(true);
          setTimeout(() => setIsClicked(false), 50);
        }}
        onMouseDown={() => setIsClicked(true)}
        onMouseUp={() => setIsClicked(false)}
        onMouseLeave={() => setIsClicked(false)}
      >
        <Image
          className={classes.image}
          src={!isClicked ? "/assets/button/button_0.svg" : "/assets/button/button_1.svg"}
        />
      </Box>
    </Center>
  );
};

export default memo(MainGameButton);
