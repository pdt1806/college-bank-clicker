import { NumberFormatter, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
import { SidebarsStore } from "../../../GameProvider/Stores/SidebarsStore";

const UpgradeBarBalance = () => {
  const asideOpened = SidebarsStore((state) => state.asideOpened);

  useEffect(() => {
    setMoney(Math.trunc(GameDataStore.getState().money));

    if (!asideOpened) return;

    const unsub = GameDataStore.subscribe((state) => {
      setMoney(Math.trunc(state.money));
    });

    return () => unsub();
  }, [asideOpened]);

  const [money, setMoney] = useState(() => Math.trunc(GameDataStore.getState().money));

  if (!asideOpened) return null;

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
