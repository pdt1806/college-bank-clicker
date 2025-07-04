import { Box, Text, Title } from "@mantine/core";
import { memo } from "react";
import { useShallow } from "zustand/shallow";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
import classes from "./index.module.css";
import { MainGameBalanceNumber } from "./Number";

const MainGameBalance = () => {
  const { perSecond, perClick, secondMultiplier, clickMultiplier } = GameDataStore(
    useShallow(({ perSecond, perClick, secondMultiplier, clickMultiplier }) => ({
      perSecond,
      perClick,
      secondMultiplier,
      clickMultiplier,
    }))
  );

  return (
    <Box ta="center" p="lg" className={classes.counter} c="white">
      <Title order={2} fw={500}>
        money earned from students
      </Title>
      <Title order={1} size="2.5rem" className={classes.balance}>
        <MainGameBalanceNumber />
      </Title>
      <Text size="md">per second: {(perSecond * secondMultiplier).toLocaleString()}</Text>
      <Text size="md">per click: {(perClick * clickMultiplier).toLocaleString()}</Text>
    </Box>
  );
};

export default memo(MainGameBalance);
