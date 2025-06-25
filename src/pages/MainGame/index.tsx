import { Flex, Text } from "@mantine/core";
import { useOutletContext } from "react-router-dom";
import { UNIFORMED_HEIGHT } from "../../utils/const";
import MainGameBalance from "./Balance";
import MainGameButton from "./Button";

const MainGame = () => {
  const { asideOpened, navbarOpened } = useOutletContext<OutletContext>();

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      h={{ base: UNIFORMED_HEIGHT, lg: "100vh" }}
      p="sm"
    >
      {!asideOpened && !navbarOpened && <MainGameBalance />}
      <MainGameButton />
      <Text size="sm" c="white" ta="center">
        This game is a parody and is definitely not affiliated with College
        Board.
      </Text>
    </Flex>
  );
};

export default MainGame;
