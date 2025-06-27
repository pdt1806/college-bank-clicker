import { Button, FileButton, Group, Image, Stack, Table, Text, Title, Tooltip } from "@mantine/core";
import { useState } from "react";
import useSound from "use-sound";
import { resetCursor, updateCursor } from "../../../GameProvider/GameActions";
import { SettingsDataStore } from "../../../GameProvider/Stores/SettingsDataStore";
import { audio } from "../../../utils/audio";
import { GAME_CURSORS } from "../../../utils/const";

interface CursorItem {
  label: string;
  type: "default" | "pointer";
  image: string;
  setState: (value: string) => void;
}

export const CustomCursorsSettings = () => {
  const [defaultCursor, setDefaultCursor] = useState<string>(
    sessionStorage.getItem("defaultCursorURL") || GAME_CURSORS.default
  );
  const [pointerCursor, setPointerCursor] = useState<string>(
    sessionStorage.getItem("pointerCursorURL") || GAME_CURSORS.pointer
  );

  const data: CursorItem[] = [
    {
      label: "Default",
      type: "default",
      image: defaultCursor,
      setState: setDefaultCursor,
    },
    {
      label: "Pointer",
      type: "pointer",
      image: pointerCursor,
      setState: setPointerCursor,
    },
  ];

  const { sfxVolume } = SettingsDataStore.getState();
  const sfxMutedIOS = SettingsDataStore((state) => state.sfxMutedIOS);

  const [playSound] = useSound(audio.pop, {
    volume: sfxVolume / 100,
    soundEnabled: !sfxMutedIOS,
  });

  return (
    <Stack w="100%">
      <Title order={2} fw={500}>
        Cursors settings
      </Title>
      <Text c="dimmed">You can customize the cursors used in the game with your own images.</Text>
      <Table verticalSpacing="sm" withRowBorders={false}>
        <Table.Tbody>
          {data.map((item) => (
            <Table.Tr key={item.label}>
              <Table.Th p="0">
                <Title order={4} fw={400}>
                  {item.label}
                </Title>
              </Table.Th>
              <Table.Td w="70%">
                <Group gap="xl">
                  <FileButton
                    onChange={async (file) => {
                      if (!file) return;
                      const url = await updateCursor(item.type, file);
                      if (!url) return;
                      item.setState(url);
                      playSound();
                    }}
                    accept="image/png,image/jpeg"
                    multiple={false}
                  >
                    {(props) => (
                      <Tooltip label="Click to change cursor" withArrow>
                        <Image
                          {...props}
                          src={item.image}
                          alt={item.label}
                          style={{ width: "50px", height: "50px" }}
                          {...(item.type == "pointer" && { className: "cursor-pointer" })}
                        />
                      </Tooltip>
                    )}
                  </FileButton>
                  <Button
                    display={item.image === GAME_CURSORS[item.type] ? "none" : "block"}
                    radius="xl"
                    onClick={() => {
                      resetCursor(item.type);
                      item.setState(GAME_CURSORS[item.type]);
                      playSound();
                    }}
                  >
                    Reset to default
                  </Button>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  );
};
