import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconRefresh } from "@tabler/icons-react";
import useSound from "use-sound";
import { resetAllGame } from "../../../GameProvider/GameActions";
import { SettingsDataStore } from "../../../GameProvider/Stores/SettingsDataStore";
import { audio } from "../../../utils/audio";

const ResetGameData = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { sfxVolume } = SettingsDataStore.getState();
  const sfxMutedIOS = SettingsDataStore((state) => state.sfxMutedIOS);

  const [playSoundAchievement] = useSound(audio.achievement, {
    volume: sfxVolume / 100,
    soundEnabled: !sfxMutedIOS,
  });

  const [playSoundPop] = useSound(audio.pop, {
    volume: sfxVolume / 100,
    soundEnabled: !sfxMutedIOS,
  });

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false} radius="lg" c="cbc-purple.9">
        <Text>
          Are you sure you want to reset your game? This will permanently erase all progress and cannot be undone.
        </Text>
        <Group mt="md" ml="auto" w="fit-content">
          <Button onClick={close} variant="transparent" c="cbc-purple.9">
            Cancel
          </Button>
          <Button
            radius="md"
            color="red"
            onClick={() => {
              resetAllGame();
              playSoundAchievement();
              notifications.show({
                radius: "lg",
                styles: {
                  title: { color: "var(--mantine-color-cbc-purple-9)" },
                },
                title: "Game data reset!",
                message: "Now you can relive the whole progress.",
                color: "cbc-green",
                autoClose: 3000,
                icon: <IconRefresh size={24} />,
              });
              close();
            }}
          >
            Yes, reset!
          </Button>
        </Group>
      </Modal>
      <Stack>
        <Title order={2} fw={500}>
          Reset game data
        </Title>
        <Text c="dimmed">
          Reset your game data to start over. This will erase all progress, including achievements, upgrades, and money.
        </Text>
        <Button
          size="lg"
          color="red"
          onClick={() => {
            open();
            playSoundPop();
          }}
          radius="xl"
        >
          Reset
        </Button>
      </Stack>
    </>
  );
};

export default ResetGameData;
