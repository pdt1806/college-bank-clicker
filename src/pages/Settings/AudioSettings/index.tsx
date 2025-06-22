import { ActionIcon, Slider, Stack, Table, Title } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { useGame } from "../../../GameProvider";
import { audio } from "../../../utils/audio";

const AudioSettings = () => {
  const {
    musicVolume,
    sfxVolume,
    setMusicVolume,
    setSfxVolume,
    musicMutedIOS,
    setMusicMutedIOS,
    sfxMutedIOS,
    setSfxMutedIOS,
    playSound,
  } = useGame();

  const os = useOs();

  return (
    <Stack w="100%">
      <Title order={2} fw={500}>
        Audio settings
      </Title>
      <Table verticalSpacing="sm" withRowBorders={false}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th p="0">
              <Title order={4} fw={400}>
                Music
              </Title>
            </Table.Th>
            <Table.Td w={os !== "ios" ? "70%" : "max-content"}>
              {os !== "ios" ? (
                <Slider color="cbc-purple" defaultValue={musicVolume} onChange={setMusicVolume} size="xl" />
              ) : (
                <ActionIcon
                  radius="xl"
                  w="100%"
                  variant="white"
                  color="cbc-purple"
                  onClick={() => setMusicMutedIOS((prev) => !prev)}
                  size="xl"
                >
                  {!musicMutedIOS ? <IconVolume /> : <IconVolumeOff />}
                </ActionIcon>
              )}
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th p="0">
              <Title order={4} fw={400}>
                SFX
              </Title>
            </Table.Th>
            <Table.Td>
              {os !== "ios" ? (
                <Slider
                  color="cbc-purple"
                  defaultValue={sfxVolume}
                  onChange={setSfxVolume}
                  size="xl"
                  onChangeEnd={() => playSound(audio.pop)}
                />
              ) : (
                <ActionIcon
                  radius="xl"
                  w="100%"
                  variant="white"
                  color="cbc-purple"
                  onClick={() => setSfxMutedIOS((prev) => !prev)}
                  size="xl"
                >
                  {!sfxMutedIOS ? <IconVolume /> : <IconVolumeOff />}
                </ActionIcon>
              )}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Stack>
  );
};

export default AudioSettings;
