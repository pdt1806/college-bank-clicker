import { ActionIcon, ScrollArea, Stack, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { upgradeList } from "../../utils";
import Upgrade from "../Upgrade";
import classes from "./index.module.css";

const Sidebar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <ScrollArea className={classes.sidebar} bg="cbs.1">
      <Stack align="stretch" gap="md" px="md" py="lg">
        <Title order={3} c="white">
          Upgrades
        </Title>
        {upgradeList.map((upgrade) => (
          <Upgrade key={upgrade.name} upgrade={upgrade} />
        ))}
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
    </ScrollArea>
  );
};

export default Sidebar;
