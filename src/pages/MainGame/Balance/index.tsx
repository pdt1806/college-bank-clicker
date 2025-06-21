import { Box, NumberFormatter, Text, Title } from "@mantine/core";
import { useGame } from "../../../GameProvider";
import classes from "./index.module.css";

const MainGameBalance = () => {
  const { money, perSecond, perClick } = useGame();

  return (
    <Box ta="center" p="lg" className={classes.counter} c="white">
      <Title order={2} fw={500}>
        money earned from students
      </Title>
      <Title order={1}>
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

export default MainGameBalance;
