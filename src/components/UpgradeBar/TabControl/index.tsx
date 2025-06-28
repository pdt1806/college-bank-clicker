import { Accordion, Group, HoverCard, Text, Title } from "@mantine/core";
import { playSound } from "../../../GameProvider/SoundManager";

export const UpgradeBarTabControl = ({ tab }: { tab: UpgradeBarTab }) => {
  return (
    <Accordion.Control onClick={() => playSound("dropdown")}>
      <Group gap="xs">
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
      </Group>
    </Accordion.Control>
  );
};
