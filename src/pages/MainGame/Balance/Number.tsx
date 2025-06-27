import { NumberFormatter } from "@mantine/core";
import { useOutletContext } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";

export const MainGameBalanceNumber = () => {
  const { asideOpened, navbarOpened } = useOutletContext<OutletContext>();

  const money = !(asideOpened || navbarOpened)
    ? GameDataStore(useShallow((state) => Math.trunc(state.money)))
    : GameDataStore.getState().money;

  return <NumberFormatter prefix="$ " value={money} thousandSeparator decimalScale={0} />;
};
