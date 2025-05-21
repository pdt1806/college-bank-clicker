import { ActionIcon, ScrollArea, Stack, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { upgradeList } from "../../utils";
import Upgrade from "../Upgrade";
import classes from "./index.module.css";

const Sidebar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <Stack gap="md" p="lg" bg="cbs.1" className={classes.sidebar}>
      <Title order={3} c="white">
        Upgrades
      </Title>
      <ScrollArea.Autosize scrollbarSize={8}>
        <Stack gap="md">
          {upgradeList.map((upgrade) => (
            <Upgrade key={upgrade.name} upgrade={upgrade} />
          ))}
        </Stack>
      </ScrollArea.Autosize>
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
  );
};

export default Sidebar;
