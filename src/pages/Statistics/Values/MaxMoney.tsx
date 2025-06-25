import { NumberFormatter } from "@mantine/core";
import { StatsDataStore } from "../../../GameProvider/Stores/StatsDataStore";

export const StatsMaxMoney = () => {
  const maxMoney = StatsDataStore((state) => Math.trunc(state.maxMoney));

  return (
    <NumberFormatter
      prefix="$"
      value={maxMoney}
      thousandSeparator
      decimalScale={0}
    />
  );
};
