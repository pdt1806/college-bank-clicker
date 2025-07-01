import { NumberFormatter } from "@mantine/core";
import { useEffect, useState } from "react";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
import { SidebarsStore } from "../../../GameProvider/Stores/SidebarsStore";

export const MainGameBalanceNumber = () => {
  const asideOpened = SidebarsStore((state) => state.asideOpened);
  const navbarOpened = SidebarsStore((state) => state.navbarOpened);

  const [money, setMoney] = useState(GameDataStore.getState().money);

  useEffect(() => {
    if (asideOpened || navbarOpened) {
      setMoney(Math.trunc(GameDataStore.getState().money));
      return;
    }

    const unsub = GameDataStore.subscribe((state) => {
      setMoney(Math.trunc(state.money));
    });
    return () => unsub();
  }, [asideOpened, navbarOpened]);

  return <NumberFormatter prefix="$ " value={Math.trunc(money)} thousandSeparator decimalScale={0} />;
};
