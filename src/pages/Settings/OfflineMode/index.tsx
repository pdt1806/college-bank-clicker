import { Group, Stack, Switch, Text, Title } from "@mantine/core";
import useSound from "use-sound";
import { SettingsDataStore } from "../../../GameProvider/Stores/SettingsDataStore";
import { audio } from "../../../utils/audio";

export const OfflineModeSettings = () => {
  const { setOfflineMode, sfxVolume, sfxMutedIOS } = SettingsDataStore.getState();
  const offlineMode = SettingsDataStore((state) => state.offlineMode);

  const [playSound] = useSound(audio.pop, {
    volume: sfxVolume / 100,
    soundEnabled: !sfxMutedIOS,
  });

  return (
    <Stack w="100%">
      <Title order={2} fw={500}>
        Offline Mode
      </Title>
      <Text c="dimmed">
        Offline Mode lets you earn resources while the game is closed. It helps you progress without playing, but
        doesn't allow playing without internet.
      </Text>
      <Group gap="xl">
        <Title order={4} fw={400}>
          Toggle Offline Mode
        </Title>
        <Switch
          checked={offlineMode}
          size="xl"
          onClick={() => {
            playSound();
            setOfflineMode(!offlineMode);
          }}
          classNames={{
            track: "cursor-pointer",
          }}
          withThumbIndicator={false}
          labelPosition="left"
          w="max-content"
        />
      </Group>
    </Stack>
  );
};
