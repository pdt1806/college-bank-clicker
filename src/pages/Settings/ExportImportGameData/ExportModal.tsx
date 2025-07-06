import { Button, CopyButton, Grid, JsonInput, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import { playSound } from "../../../GameProvider/SoundManager";
import { ExportGameDataType } from "../../../utils/types";

export const ExportGameDataModal = () => {
  const [opened, { open: openModal, close }] = useDisclosure(false);
  const [item, setItem] = useState<ExportGameDataType | null>(null);

  const open = useCallback(
    (item: ExportGameDataType | undefined) => {
      if (!item) {
        console.error("No game data to export");
        return;
      }
      setItem(item);
      openModal();
      playSound("pop");
    },
    [openModal]
  );

  const element = useMemo(() => {
    return (
      <Modal opened={opened} onClose={close} centered radius="lg" c="cbc-purple.9" withCloseButton={false} size="xl">
        {item && (
          <Stack>
            <Title order={3} fw={500} mt="xs">
              Export Game Data
            </Title>
            <Text c="dimmed">
              Manually save your game data. Click "Copy to Clipboard," then paste the content into a text editor (like
              Notepad or VS Code) and save it as a `.json` file on your computer.
            </Text>
            <JsonInput formatOnBlur autosize minRows={6} maxRows={6} value={JSON.stringify(item)} />
            <Grid>
              <Grid.Col span={10}>
                <CopyButton value={JSON.stringify(item)}>
                  {({ copied, copy }) => (
                    <Button
                      color={copied ? "cbc-green" : "cbc-teal"}
                      onClick={() => {
                        try {
                          copy();
                          playSound("pop");
                        } catch (error) {
                          console.error("Failed to copy to clipboard:", error);
                        }
                      }}
                      radius="md"
                      w="100%"
                    >
                      {copied ? "Copied!" : "Copy to Clipboard"}
                    </Button>
                  )}
                </CopyButton>
              </Grid.Col>
              <Grid.Col span={2}>
                <Button radius="md" color="cbc-purple" variant="light" onClick={close} w="100%">
                  Close
                </Button>
              </Grid.Col>
            </Grid>
          </Stack>
        )}
      </Modal>
    );
  }, [item, opened, close]);

  return useMemo(() => ({ open, close, element }), [open, close, element]);
};
