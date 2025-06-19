import { Center, Image } from "@mantine/core";
import { useGame } from "../../../GameProvider";
import classes from "./index.module.css";

const MainGameButton = () => {
  const { increment, saveGame, setTotalClicks, saveStats } = useGame();
  return (
    <Center h="100%" w="100%">
      <Image
        src="/assets/money-button.png"
        onClick={() => {
          increment();
          saveGame();
          setTotalClicks((prev) => prev + 1);
          saveStats();
        }}
        className={classes.image}
      />
    </Center>
  );
};

export default MainGameButton;
