import { ActionIcon, Box, Center, Image, NumberFormatter, Text, Title } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useGame } from "../../GameProvider";
import classes from "./index.module.css";

const MainGame = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const { money, increment, perSecond, perClick, saveGame } = useGame();

  return (
    <Box
      h="100vh"
      // bg="green.9"
      className={classes.container}
    >
      <Box
        ta="center"
        p="lg"
        className={classes.counter}
        c="white"
        ml="xs"
        mt="xs"
        w={{
          base: "calc(100% - 2*var(--mantine-spacing-xs))",
          md: "calc(100% - 380px - 2*var(--mantine-spacing-md))",
        }}
      >
        <Title order={2}>money taken from students</Title>
        <Title order={1}>
          <NumberFormatter prefix="$" value={Math.trunc(money)} thousandSeparator decimalScale={0} />
        </Title>
        <Text size="md">per second: {perSecond.toFixed(1)}</Text>
        <Text size="md">per click: {perClick}</Text>
      </Box>
      <Center h="100%" w="100%">
        <Image
          src="/images/osaka.jpg"
          onClick={() => {
            increment();
            saveGame();
          }}
          className={classes.image}
        />
      </Center>
      <Text
        size="xs"
        c="white"
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
        }}
        maw={{ base: "calc(100% - 80px)", md: "100%" }}
      >
        Disclaimer: This game is a parody and is not affiliated with College Board.
      </Text>
      <ActionIcon
        onClick={toggleMenu}
        variant="filled"
        color="cbs.1"
        size="xl"
        radius="xl"
        aria-label="Menu"
        style={{ position: "absolute", bottom: 20, right: 20 }}
        hiddenFrom="md"
      >
        <IconShoppingCart stroke={1.5} />
      </ActionIcon>
    </Box>
  );
};

export default MainGame;
