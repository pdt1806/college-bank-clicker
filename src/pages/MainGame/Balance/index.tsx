import { Box, Text, Title } from "@mantine/core";
import { memo } from "react";
import { useShallow } from "zustand/shallow";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
import classes from "./index.module.css";
import { MainGameBalanceNumber } from "./Number";

const MainGameBalance = () => {
  const { perSecond, perClick } = GameDataStore(
    useShallow(({ perSecond, perClick }) => ({
      perSecond,
      perClick,
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
      <Text size="md">per second: {perSecond.toFixed(1)}</Text>
      <Text size="md">per click: {perClick}</Text>
    </Box>
  );
};

export default memo(MainGameBalance);
