import { Button, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useMemo, useState } from "react";
import InventoryItemInformation from "../../components/InventoryBox/Information";
import { playSound } from "../../GameProvider/SoundManager";
import { InventoryItem } from "../../utils/types";

export const InventoryModal = () => {
  const [opened, { open: openModal, close }] = useDisclosure(false);
  const [item, setItem] = useState<InventoryItem | null>(null);

  const open = useCallback(
    (item: InventoryItem) => {
      setItem(item);
      openModal();
      playSound("pop");
    },
    [openModal],
  );

  const element = useMemo(() => {
    return (
      <Modal opened={opened} onClose={close} centered radius="lg" c="cbc-purple.9" withCloseButton={false} size="xl">
        {item && (
          <Stack>
            <InventoryItemInformation item={item} />
            <Button radius="md" color="cbc-purple" onClick={close} mt="md" w="fit-content" ml="auto">
              Close
            </Button>
          </Stack>
        )}
      </Modal>
    );
  }, [item, opened, close]);

  return useMemo(() => ({ open, close, element }), [open, close, element]);
};
