import { Accordion, Group, Text, Tooltip } from "@mantine/core";
import { playSound } from "../../../GameProvider/SoundManager";
import { UpgradeBarTab } from "../../../utils/types";

export const UpgradeBarTabControl = ({ tab }: { tab: UpgradeBarTab }) => {
  return (
    <Accordion.Control onClick={() => playSound("dropdown")}>
      <Tooltip label={tab.description} withArrow color="cbc-bluegreen" openDelay={500}>
        <Group gap="xs" w="max-content">
          <tab.icon size={24} color="white" />
          <Text size="xl" c="white" fw={500}>
            {tab.name}
          </Text>
        </Group>
      </Tooltip>
    </Accordion.Control>
  );
};
