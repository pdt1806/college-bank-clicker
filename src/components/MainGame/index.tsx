import { ActionIcon, Box, Center, Image, NumberFormatter, Text, Title } from "@mantine/core";
import { IconMenu2 } from "@tabler/icons-react";
import { useContext } from "react";
import { GameContext } from "../../GameProvider";
import classes from "./index.module.css";

const MainGame = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const { students, increment, perSecond } = useContext(GameContext);

  return (
    <Box
      h="100vh"
      w="100%"
      style={{
        background: "url(https://wallpapersok.com/images/hd/grungy-green-chalkboard-background-mas02xb0oybagefx.jpg)",
        backgroundSize: "cover",
      }}
    >
      <Box
        ta="center"
        p="lg"
        style={{ position: "absolute", backgroundColor: "#00000050" }}
        w={{ base: "100%", md: "calc(100% - 400px)" }}
        c="white"
      >
        <Title order={2}>Students suffering</Title>
        <Title order={1}>
          <NumberFormatter value={students} thousandSeparator decimalScale={0} />
        </Title>
        <Text size="md">per second: {perSecond}</Text>
      </Box>
      <Center h="100%" w="100%">
        <Image src="/images/osaka.jpg" onClick={() => increment()} className={classes.image} />
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
        variant="default"
        size="xl"
        radius="xl"
        aria-label="Menu"
        style={{ position: "absolute", bottom: 20, right: 20 }}
        hiddenFrom="md"
      >
        <IconMenu2 stroke={1.5} />
      </ActionIcon>
    </Box>
  );
};

export default MainGame;
