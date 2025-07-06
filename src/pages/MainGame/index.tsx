import { Flex, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";
import { DiscordStore } from "../../GameProvider/Stores/DiscordStore";
import { UNIFORMED_HEIGHT } from "../../utils/const";
import MainGameBalance from "./Balance";
import MainGameButton from "./Button";

const MainGame = () => {
  const isInDiscord = DiscordStore((state) => state.isInDiscord);
  const isMinifiedInDiscord = useMediaQuery("(max-width: 330px)");
  const discordSmallScreen = isInDiscord && isMinifiedInDiscord;

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      h={{ base: discordSmallScreen ? "100vh" : UNIFORMED_HEIGHT, lg: "100vh" }}
      p="sm"
    >
      <MainGameBalance />
      {!discordSmallScreen && (
        <>
          <MainGameButton />
          <Text size="sm" c="white" ta="center">
            This game is a parody and is definitely not affiliated with College Board.
          </Text>
        </>
      )}
    </Flex>
  );
};

export default memo(MainGame);
