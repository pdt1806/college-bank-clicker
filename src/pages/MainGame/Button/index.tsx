import { Center, Image } from "@mantine/core";
import { useGame } from "../../../GameProvider";
import classes from "./index.module.css";

const MainGameButton = () => {
  const { increment, saveGame, setTotalClicks, saveStats } = useGame();
  return (
    <Center h="100%" w="100%">
      <Image
        src="/assets/money-button.png"
        onClick={(e) => {
          e.preventDefault(); // Prevent default image behavior
          increment();
          saveGame();
          setTotalClicks((prev) => prev + 1);
          saveStats();
        }}
        className={classes.image}
        alt="Money Button"
        fallbackSrc="/assets/money-button.png" // Optional: fallback if image fails to load
      />
    </Center>
  );
};

export default MainGameButton;
