import { Box, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";
import { useShallow } from "zustand/shallow";
import { DiscordStore } from "../../../GameProvider/Stores/DiscordStore";
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

  const isInDiscord = DiscordStore((state) => state.isInDiscord);
  const isMinifiedInDiscord = useMediaQuery("(max-width: 330px)");
  const discordSmallScreen = isInDiscord && isMinifiedInDiscord;

  return (
    <Box ta="center" p="lg" className={classes.counter} c="white">
      <Title order={discordSmallScreen ? 4 : 2} fw={500}>
        money earned from students
      </Title>
      <Title order={1} size={discordSmallScreen ? "1.75rem" : "2.5rem"} className={classes.balance}>
        <MainGameBalanceNumber />
      </Title>
      <Text size={discordSmallScreen ? "sm" : "md"}>per second: {(perSecond * secondMultiplier).toLocaleString()}</Text>
      <Text size={discordSmallScreen ? "sm" : "md"}>per click: {(perClick * clickMultiplier).toLocaleString()}</Text>
    </Box>
  );
};

export default memo(MainGameBalance);
