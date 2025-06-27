import { Box, Center, Image, Text } from "@mantine/core";
import { memo, useState } from "react";
import { increment } from "../../../GameProvider/GameActions";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
import classes from "./index.module.css";

const MainGameButton = () => {
  const perClick = GameDataStore((state) => state.perClick);

  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  const animate = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newFloat: FloatingText = {
      id: Date.now() + Math.random(),
      x: e.nativeEvent.offsetX + (Math.random() * 20 - 10),
      y: e.nativeEvent.offsetY + (Math.random() * 10 - 5),
      value: "+$" + perClick,
    };

    setFloatingTexts((prev) => [...prev, newFloat]);

    setTimeout(() => {
      setFloatingTexts((prev) => prev.filter((f) => f.id !== newFloat.id));
    }, 1000);
  };

  return (
    <Center h="100%" w="100%">
      <Box className={classes.wrapper}>
        <Image
          src="/assets/money-button.svg"
          onClick={(e) => {
            animate(e);
            increment();
          }}
          className={`${classes.image} cursor-pointer`}
          alt="Money Button"
        />
        {floatingTexts.map((text) => (
          <Text
            size="1.5rem"
            ff="Oxanium, sans-serif"
            c="cbc-green.9"
            fw="bold"
            key={text.id}
            className={classes.floatingText}
            style={{
              left: text.x,
              top: text.y,
            }}
          >
            {text.value}
          </Text>
        ))}
      </Box>
    </Center>
  );
};

export default memo(MainGameButton);
