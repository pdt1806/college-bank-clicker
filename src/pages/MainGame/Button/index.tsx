import { Center, Image } from "@mantine/core";
import { useGame } from "../../../GameProvider";
import classes from "./index.module.css";

const MainGameButton = () => {
  const { increment, saveGame } = useGame();
  return (
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
  );
};

export default MainGameButton;
