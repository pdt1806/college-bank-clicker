import { ActionIcon, Group, HoverCard, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import { automaticUpgradeList, manualUpgradeList } from "../../utils/upgrades";
import Upgrade from "../Upgrade";
import UpgradeBarBalance from "./Balance";
import classes from "./index.module.css";

const UpgradeBar = () => {
  const [displayManualUpgrades, setDisplayManualUpgrades] = useState(true);
  const [displayAutomaticUpgrades, setDisplayAutomaticUpgrades] = useState(true);

  return (
    <>
      <ScrollArea.Autosize
        scrollbarSize={8}
        bg="cbc-bluegray.8"
        className={classes.sidebar}
        pt={`env(safe-area-inset-top)`}
      >
        <UpgradeBarBalance />
        <Stack gap="md" p="lg">
          <>
            <Group gap="xs">
              <HoverCard openDelay={300}>
                <HoverCard.Target>
                  <Title order={3} c="white" w="max-content" fw={500}>
                    Manual Upgrades
                  </Title>
                </HoverCard.Target>
                <HoverCard.Dropdown maw={400} p="xs">
                  <Text size="sm">Upgrade the amount of money per click. Each upgrade is one time only.</Text>
                </HoverCard.Dropdown>
              </HoverCard>
              <ActionIcon variant="transparent" color="white" onClick={() => setDisplayManualUpgrades((prev) => !prev)}>
                <IconChevronUp
                  stroke={2}
                  style={{
                    transform: displayManualUpgrades ? "rotate(0deg)" : "rotate(-180deg)",
                    transition: "transform 0.1s",
                  }}
                />
              </ActionIcon>
            </Group>
            <Stack gap="md" display={displayManualUpgrades ? "flex" : "none"}>
              {manualUpgradeList.map((upgrade) => (
                <Upgrade key={upgrade.name} upgrade={upgrade} />
              ))}
            </Stack>
          </>
          <>
            <Group gap="xs">
              <HoverCard openDelay={300}>
                <HoverCard.Target>
                  <Title order={3} c="white" w="max-content" fw={500}>
                    Automatic Upgrades
                  </Title>
                </HoverCard.Target>
                <HoverCard.Dropdown maw={400} p="xs">
                  <Text size="sm">Increase the amount of money per second.</Text>
                </HoverCard.Dropdown>
              </HoverCard>
              <ActionIcon
                variant="transparent"
                color="white"
                onClick={() => setDisplayAutomaticUpgrades((prev) => !prev)}
              >
                <IconChevronUp
                  stroke={2}
                  style={{
                    transform: displayAutomaticUpgrades ? "rotate(0deg)" : "rotate(-180deg)",
                    transition: "transform 0.1s",
                  }}
                />
              </ActionIcon>
            </Group>
            <Stack gap="md" display={displayAutomaticUpgrades ? "flex" : "none"}>
              {automaticUpgradeList.map((upgrade) => (
                <Upgrade key={upgrade.name} upgrade={upgrade} />
              ))}
            </Stack>
          </>
        </Stack>
      </ScrollArea.Autosize>
    </>
  );
};

export default UpgradeBar;
