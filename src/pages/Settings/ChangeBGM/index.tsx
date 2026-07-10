import { CheckIcon, Combobox, Group, InputBase, Stack, Text, Title, useCombobox } from "@mantine/core";
import { IconDisc } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { SettingsDataStore } from "../../../GameProvider/Stores/SettingsDataStore";
import { bgm } from "../../../utils/audio";
import { BGMTrack } from "../../../utils/types";
import classes from "./index.module.css";

function isShallowEqual(obj1: BGMTrack, obj2: BGMTrack): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => obj1[key as keyof BGMTrack] === obj2[key as keyof BGMTrack]);
}

const ChangeBGMSettings = () => {
  const { currentBGM, setCurrentBGM, saveSettings, musicMutedIOS, musicVolume } = SettingsDataStore(
    useShallow(({ currentBGM, setCurrentBGM, saveSettings, musicMutedIOS, musicVolume }) => ({
      currentBGM,
      setCurrentBGM,
      saveSettings,
      musicMutedIOS,
      musicVolume,
    })),
  );

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const [selectedTrack, setSelectedTrack] = useState<BGMTrack>(currentBGM ?? bgm["Other"][0]);

  useEffect(() => {
    if (selectedTrack) {
      setValue(selectedTrack.title);
      setCurrentBGM(selectedTrack);
      saveSettings();
    }
  }, [selectedTrack]);

  return (
    <Stack w="100%">
      <Title order={2} fw={500}>
        Change BGM
      </Title>
      <Text c="dimmed">
        Select a background music track from the dropdown below. The selected track will play in the background while
        you play the game.
      </Text>
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          setValue(val);
          combobox.closeDropdown();
        }}
        radius="lg"
        size="md"
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            leftSection={
              <IconDisc
                size={20}
                color="var(--mantine-color-cbc-purple-filled)"
                className={musicMutedIOS || musicVolume == 0 ? "" : classes.disc}
              />
            }
            rightSection={<Combobox.Chevron />}
            rightSectionPointerEvents="none"
            onClick={() => combobox.toggleDropdown()}
            radius="lg"
            size="md"
          >
            {value}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={400} style={{ overflowY: "auto" }}>
            {Object.entries(bgm).map(([category, tracks]) => (
              <Combobox.Group key={category} label={category}>
                {tracks.map((track) => (
                  <Combobox.Option
                    key={track.src}
                    value={track.title}
                    onClick={() => setSelectedTrack(track)}
                    className={"cursor-pointer"}
                  >
                    <Group gap="xs">
                      {isShallowEqual(track, selectedTrack) && <CheckIcon size={12} />}
                      <span>{track.title}</span>
                    </Group>
                  </Combobox.Option>
                ))}
              </Combobox.Group>
            ))}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Stack>
  );
};

export default ChangeBGMSettings;
