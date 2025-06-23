import { Accordion, Box, Stack } from "@mantine/core";
import { IconAutomation, IconMouse } from "@tabler/icons-react";
import { useState } from "react";
import { automaticUpgradeList, manualUpgradeList } from "../../utils/upgrades";
import Upgrade from "../Upgrade";
import UpgradeBarBalance from "./Balance";
import { UpgradeBarTabControl } from "./TabControl";

const UpgradeBar = () => {
  const [value, setValue] = useState<string[]>(["Manual Upgrades", "Automatic Upgrades"]);

  const tabs: UpgradeBarTab[] = [
    {
      name: "Manual Upgrades",
      icon: IconMouse,
      description: "Increase the amount of money per click.",
      list: manualUpgradeList,
    },
    {
      name: "Automatic Upgrades",
      icon: IconAutomation,
      description: "Increase the amount of money per second.",
      list: automaticUpgradeList,
    },
  ];

  // Never call useGameData() here, it will cause a render loop.

  return (
    <>
      <UpgradeBarBalance />
      <Accordion
        variant="filled"
        styles={{
          chevron: { color: "white" },
        }}
        multiple
        value={value}
        onChange={setValue}
        py="xs"
      >
        <Box>
          {tabs.map((tab) => (
            <Accordion.Item key={tab.name} value={tab.name} bg="transparent" style={{ border: "none" }}>
              <UpgradeBarTabControl tab={tab} />
              <Accordion.Panel>
                <Stack gap="md">
                  {tab.list.map((upgrade) => (
                    <Upgrade key={upgrade.name} upgrade={upgrade} />
                  ))}
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Box>
      </Accordion>
    </>
  );
};

export default UpgradeBar;
