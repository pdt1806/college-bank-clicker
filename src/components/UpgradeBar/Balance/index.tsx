import { NumberFormatter, Text } from "@mantine/core";
import { useGame } from "../../../GameProvider";

const UpgradeBarBalance = () => {
  const { money } = useGame();
  return (
    <Text
      p="xs"
      ta="center"
      c="white"
      style={{ position: "sticky", top: 0, zIndex: 1 }}
      bg="cbc-bluegreen.8"
      hiddenFrom="lg"
    >
      Balance:{" "}
      <span>
        <NumberFormatter prefix="$" value={Math.trunc(money)} thousandSeparator decimalScale={0} />
      </span>
    </Text>
  );
};

export default UpgradeBarBalance;
