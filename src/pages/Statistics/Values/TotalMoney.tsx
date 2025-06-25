import { NumberFormatter } from "@mantine/core";
import { StatsDataStore } from "../../../GameProvider/Stores/StatsDataStore";

export const StatsTotalMoney = () => {
  const totalMoney = StatsDataStore((state) => state.totalMoney);

  return (
    <NumberFormatter
      prefix="$"
      value={Math.trunc(totalMoney)}
      thousandSeparator
      decimalScale={0}
    />
  );
};
