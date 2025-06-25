import { NumberFormatter } from "@mantine/core";
import { useShallow } from "zustand/shallow";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";

export const MainGameBalanceNumber = () => {
  const money = GameDataStore(useShallow((state) => Math.trunc(state.money)));

  return (
    <NumberFormatter
      prefix="$ "
      value={money}
      thousandSeparator
      decimalScale={0}
      style={{
        fontFamily: "Oxanium, sans-serif",
      }}
    />
  );
};
