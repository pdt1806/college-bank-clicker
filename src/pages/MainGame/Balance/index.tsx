import { Box, NumberFormatter, Text, Title } from "@mantine/core";
import { memo } from "react";
import { useGameData } from "../../../GameProvider/Contexts/GameDataContext";
import classes from "./index.module.css";

const MainGameBalance = () => {
  const { money, perSecond, perClick } = useGameData();

  return (
    <Box ta="center" p="lg" className={classes.counter} c="white">
      <Title order={2} fw={500}>
        money earned from students
      </Title>
      <Title order={1} size="2.5rem" className={classes.balance}>
        <NumberFormatter
          prefix="$ "
          value={Math.trunc(money)}
          thousandSeparator
          decimalScale={0}
          style={{
            fontFamily: "Oxanium, sans-serif",
          }}
        />
      </Title>
      <Text size="md">per second: {perSecond.toFixed(1)}</Text>
      <Text size="md">per click: {perClick}</Text>
    </Box>
  );
};

export default memo(MainGameBalance);
