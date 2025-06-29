import { Button, Group, Image, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import { playSound } from "../../GameProvider/SoundManager";

export const InventoryModal = () => {
  const [opened, { open: openModal, close }] = useDisclosure(false);
  const [item, setItem] = useState<InventoryItem | null>(null);

  const open = useCallback(
    (item: InventoryItem) => {
      setItem(item);
      openModal();
      playSound("pop");
    },
    [openModal]
  );

  const element = useMemo(() => {
    if (!item) return null;

    return (
      <Modal opened={opened} onClose={close} centered radius="lg" c="cbc-purple.9" withCloseButton={false} size="xl">
        <Stack>
          <Group>
            <Image
              src={item.image || "/assets/pearto.webp"}
              alt={item.name}
              h={135}
              w={135}
              style={{ borderRadius: "var(--mantine-radius-lg)" }}
            />
            <Stack>
              <Title order={3} fw={500} mt="xs">
                {item.date ? item.name : "???"}
              </Title>
              <Text c="dimmed">{item.date ? item.description : "Unlock to see what this item does."}</Text>
              <Text c="dimmed">{item.method}</Text>
              {item.date && <Text c="dimmed">Date collected: {new Date(item.date).toLocaleDateString()}</Text>}
            </Stack>
          </Group>
          <Button radius="md" color="cbc-purple" onClick={close} mt="md" w="fit-content" ml="auto">
            Close
          </Button>
        </Stack>
      </Modal>
    );
  }, [item, opened, close]);

  return useMemo(() => ({ open, close, element }), [open, close, element]);
};
