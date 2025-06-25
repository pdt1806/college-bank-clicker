import { NumberFormatter } from "@mantine/core";
import { StatsDataStore } from "../../../GameProvider/Stores/StatsDataStore";

export const StatsTotalMoney = () => {
  const totalMoney = StatsDataStore((state) => Math.trunc(state.totalMoney));

  return (
    <NumberFormatter
      prefix="$"
      value={totalMoney}
      thousandSeparator
      decimalScale={0}
    />
  );
};
