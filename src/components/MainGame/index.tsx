import { Box, Center, Flex, Image, NumberFormatter, Text, Title } from "@mantine/core";
import { useGame } from "../../GameProvider";
import classes from "./index.module.css";

const MainGame = () => {
  const { money, increment, perSecond, perClick, saveGame } = useGame();

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      h={{ base: "calc(100vh - 60px)", lg: "100vh" }}
      // bg="green.9"
      p="sm"
    >
      <Box ta="center" p="lg" className={classes.counter} c="white" w={{ mobile: "100%", xs: "80%" }}>
        <Title order={2}>money earned from students</Title>
        <Title order={1}>
          <NumberFormatter prefix="$" value={Math.trunc(money)} thousandSeparator decimalScale={0} />
        </Title>
        <Text size="md">per second: {perSecond.toFixed(1)}</Text>
        <Text size="md">per click: {perClick}</Text>
      </Box>
      <Center h="100%" w="100%">
        <Image
          src="/assets/money-button.png"
          onClick={() => {
            increment();
            saveGame();
          }}
          className={classes.image}
        />
      </Center>
      <Text size="sm" c="white" ta="center">
        This game is a parody and is definitely not affiliated with College Board.
      </Text>
    </Flex>
  );
};

export default MainGame;
