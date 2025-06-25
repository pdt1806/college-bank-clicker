import { NumberFormatter } from "@mantine/core";
import { StatsDataStore } from "../../../GameProvider/Stores/StatsDataStore";

export const StatsMaxMoney = () => {
  const maxMoney = StatsDataStore((state) => state.maxMoney);

  return (
    <NumberFormatter
      prefix="$"
      value={Math.trunc(maxMoney)}
      thousandSeparator
      decimalScale={0}
    />
  );
};
