import { ActionIcon, Slider, Stack, Table, Title } from "@mantine/core";
import { useOs } from "@mantine/hooks";
import { IconVolume, IconVolumeOff } from "@tabler/icons-react";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { playSound } from "../../../GameProvider/SoundManager";
import { SettingsDataStore } from "../../../GameProvider/Stores/SettingsDataStore";

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
  } = SettingsDataStore(
    useShallow(
      ({
        musicVolume,
        sfxVolume,
        setMusicVolume,
        setSfxVolume,
        musicMutedIOS,
        setMusicMutedIOS,
        sfxMutedIOS,
        setSfxMutedIOS,
      }) => ({
        musicVolume,
        sfxVolume,
        setMusicVolume,
        setSfxVolume,
        musicMutedIOS,
        setMusicMutedIOS,
        sfxMutedIOS,
        setSfxMutedIOS,
      })
    )
  );

  const os = useOs();

  const data = [
    {
      label: "Music",
      value: musicVolume,
      onChange: setMusicVolume,
      mutedIOS: musicMutedIOS,
      setMutedIOS: setMusicMutedIOS,
      onChangeEnd: () => {}, // No sound for music change
    },
    {
      label: "SFX",
      value: sfxVolume,
      onChange: () => {},
      mutedIOS: sfxMutedIOS,
      setMutedIOS: setSfxMutedIOS,
      onChangeEnd: (value: number) => {
        setSfxVolume(value);
        playSound("pop");
      },
    },
  ];

  useEffect(() => {
    os == "ios" && playSound("pop");
  }, [sfxMutedIOS]);

  return (
    <Stack w="100%">
      <Title order={2} fw={500}>
        Audio settings
      </Title>
      <Table verticalSpacing="sm" withRowBorders={false}>
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.label}>
              <Table.Th p="0">
                <Title order={4} fw={400}>
                  {item.label}
                </Title>
              </Table.Th>
              <Table.Td w={os !== "ios" ? "70%" : "max-content"}>
                {os !== "ios" ? (
                  <Slider
                    color="cbc-purple"
                    defaultValue={item.value}
                    onChange={item.onChange}
                    size="xl"
                    onChangeEnd={item.onChangeEnd}
                    classNames={{
                      trackContainer: "cursor-pointer",
                      thumb: "cursor-pointer",
                    }}
                  />
                ) : (
                  <ActionIcon
                    radius="xl"
                    w="100%"
                    variant="white"
                    color="cbc-purple"
                    onClick={() => {
                      item.setMutedIOS(!item.mutedIOS);
                    }}
                    size="xl"
                  >
                    {!item.mutedIOS ? <IconVolume /> : <IconVolumeOff />}
                  </ActionIcon>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};

export default AudioSettings;
