import { ActionIcon, ScrollArea, Stack, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { automaticUpgradeList, manualUpgradeList } from "../../utils";
import Upgrade from "../Upgrade";
import classes from "./index.module.css";

const Sidebar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <ScrollArea.Autosize
      scrollbarSize={8}
      bg="cbs.1"
      className={classes.sidebar}
    >
      <Stack gap="md" p="lg">
        <>
          <Title order={3} c="white">
            Manual Upgrades
          </Title>
          <Stack gap="md">
            {manualUpgradeList.map((upgrade) => (
              <Upgrade key={upgrade.name} upgrade={upgrade} />
            ))}
          </Stack>
        </>
        <>
          <Title order={3} c="white">
            Automatic Upgrades
          </Title>
          <Stack gap="md">
            {automaticUpgradeList.map((upgrade) => (
              <Upgrade key={upgrade.name} upgrade={upgrade} />
            ))}
          </Stack>
        </>
        <ActionIcon
          onClick={toggleMenu}
          color="black"
          variant="default"
          size="xl"
          radius="xl"
          aria-label="Menu"
          style={{ position: "absolute", bottom: 20, left: 20 }}
          hiddenFrom="md"
        >
          <IconChevronLeft stroke={1.5} />
        </ActionIcon>
      </Stack>
    </ScrollArea.Autosize>
  );
};

export default Sidebar;
