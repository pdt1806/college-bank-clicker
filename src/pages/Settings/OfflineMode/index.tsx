import { Stack, Switch, Text, Title } from "@mantine/core";
import { playSound } from "../../../GameProvider/GameActions";
import { SettingsDataStore } from "../../../GameProvider/Stores/SettingsDataStore";
import { audio } from "../../../utils/audio";

export const OfflineModeSettings = () => {
  const { setOfflineMode } = SettingsDataStore.getState();
  const offlineMode = SettingsDataStore((state) => state.offlineMode);

  return (
    <Stack w="100%">
      <Title order={2} fw={500}>
        Offline Mode
      </Title>
      <Text c="dimmed">
        Offline Mode lets you earn resources while the game is closed. It helps you progress without playing, but
        doesn't allow playing without internet.
      </Text>
      <Switch
        checked={offlineMode}
        size="xl"
        onClick={() => {
          playSound(audio.pop);
          setOfflineMode(!offlineMode);
        }}
        classNames={{
          labelWrapper: "cursor-default",
          label: "cursor-default",
          body: "cursor-default",
          track: "cursor-pointer",
        }}
        styles={{
          labelWrapper: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginRight: "var(--mantine-spacing-xl)",
          },
        }}
        withThumbIndicator={false}
        label={
          <Title order={4} fw={400}>
            Toggle Offline Mode
          </Title>
        }
        labelPosition="left"
      />
    </Stack>
  );
};
