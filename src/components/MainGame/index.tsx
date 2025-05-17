import { Box, Center, Image, NumberFormatter, Title } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../../GameProvider";
import classes from "./index.module.css";

const MainGame = () => {
  const { students, increment, decrementTime } = useContext(GameContext);

  return (
    <Box h="100vh" w="100%" bg="blue.0">
      <Box
        ta="center"
        p="lg"
        style={{ position: "absolute", backgroundColor: "#00000020" }}
        w={{ base: "100%", md: "calc(100% - 400px)" }}
      >
        <Title order={2}>Students suffering</Title>
        <Title order={1}>
          <NumberFormatter value={students} thousandSeparator />
        </Title>
      </Box>
      <Center h="100%" w="100%">
        <Image src="/images/osaka.jpg" onClick={() => increment()} className={classes.image} />
      </Center>
    </Box>
  );
};

export default MainGame;
