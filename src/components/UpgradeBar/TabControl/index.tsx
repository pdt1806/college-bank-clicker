import { Accordion, Group, HoverCard, Text, Title } from "@mantine/core";
import useSound from "use-sound";
import { SettingsDataStore } from "../../../GameProvider/Stores/SettingsDataStore";
import { audio } from "../../../utils/audio";

export const UpgradeBarTabControl = ({ tab }: { tab: UpgradeBarTab }) => {
  const { sfxVolume } = SettingsDataStore.getState();
  const sfxMutedIOS = SettingsDataStore((state) => state.sfxMutedIOS);

  const [playSound] = useSound(audio.dropdown, {
    volume: sfxVolume / 100,
    soundEnabled: !sfxMutedIOS,
  });

  return (
    <Accordion.Control onClick={() => playSound()}>
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
