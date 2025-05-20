import { ActionIcon, ScrollArea, Stack, Title } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import { upgradeList } from "../../utils";
import Upgrade from "../Upgrade";

const Sidebar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <ScrollArea
      style={{
        background:
          "url(https://static.vecteezy.com/system/resources/previews/004/584/977/non_2x/beautiful-wood-background-with-text-space-free-vector.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
        height: "100vh",
      }}
    >
      <Stack align="stretch" gap="md" px="md" py="xl">
        <Title order={3} c="white">
          Upgrades
        </Title>
        {upgradeList.map((upgrade) => (
          <Upgrade key={upgrade.name} upgrade={upgrade} />
        ))}
        <ActionIcon
          onClick={toggleMenu}
          color="black"
          variant="light"
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
