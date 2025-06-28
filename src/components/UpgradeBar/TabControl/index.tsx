import { Accordion, Group, HoverCard, Text } from "@mantine/core";
import { playSound } from "../../../GameProvider/SoundManager";

export const UpgradeBarTabControl = ({ tab }: { tab: UpgradeBarTab }) => {
  return (
    <Accordion.Control onClick={() => playSound("dropdown")}>
      <Group gap="xs">
        <HoverCard openDelay={300}>
          <HoverCard.Target>
            <Group gap="xs">
              <tab.icon size={24} color="white" />
              <Text size="xl" c="white" fw={500}>
                {tab.name}
              </Text>
            </Group>
          </HoverCard.Target>
          <HoverCard.Dropdown maw={400} p="xs">
            <Text size="sm">{tab.description}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </Accordion.Control>
  );
};
