import { Box, Group, HoverCard, Stack, Text, Title } from "@mantine/core";
import { IconAutomation, IconMouse } from "@tabler/icons-react";
import { useState } from "react";
import { automaticUpgradeList, manualUpgradeList } from "../../utils/upgrades";
import Upgrade from "../Upgrade";
import UpgradeBarBalance from "./Balance";
import DropdownButton from "./DropdownButton";
import classes from "./index.module.css";

const UpgradeBar = () => {
  const [displayManualUpgrades, setDisplayManualUpgrades] = useState(true);
  const [displayAutomaticUpgrades, setDisplayAutomaticUpgrades] = useState(true);

  const tabs: UpgradeBarTab[] = [
    {
      name: "Manual Upgrades",
      icon: IconMouse,
      description: "Upgrade the amount of money per click. Each upgrade is one time only.",
      list: manualUpgradeList,
      function: () => setDisplayManualUpgrades((prev) => !prev),
      controller: displayManualUpgrades,
    },
    {
      name: "Automatic Upgrades",
      icon: IconAutomation,
      description: "Increase the amount of money per second.",
      list: automaticUpgradeList,
      function: () => setDisplayAutomaticUpgrades((prev) => !prev),
      controller: displayAutomaticUpgrades,
    },
  ];

  // Never use `useGame` here, as it will cause re-renders of buttons

  return (
    <Box>
      <UpgradeBarBalance />
      <Stack gap="md" p="lg">
        {tabs.map((tab) => (
          <Box key={tab.name}>
            <Group gap="xs" mb="md">
              <HoverCard openDelay={300}>
                <HoverCard.Target>
                  <Group gap="xs">
                    <tab.icon size={24} color="white" />
                    <Title order={3} c="white" w="max-content" fw={500}>
                      {tab.name}
                    </Title>
                  </Group>
                </HoverCard.Target>
                <HoverCard.Dropdown maw={400} p="xs">
                  <Text size="sm">{tab.description}</Text>
                </HoverCard.Dropdown>
              </HoverCard>
              <DropdownButton tab={tab} />
            </Group>
            <Stack gap="md" display={tab.controller ? "flex" : "none"} className={classes.stack}>
              {tab.list.map((upgrade) => (
                <Upgrade key={upgrade.name} upgrade={upgrade} />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default UpgradeBar;
