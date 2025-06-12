import { Button, Group, Modal, Stack, Text, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useGame } from "../../../GameProvider";

const ResetGameData = () => {
  const { resetGameData } = useGame();
  const [opened, { open, close }] = useDisclosure(false);

  const isMobile = useMediaQuery("(max-width: 62em)");

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <Text>
          Are you sure you want to reset your game? This will permanently erase all progress and cannot be undone.
        </Text>
        <Group mt="md">
          <Button
            color="red"
            onClick={() => {
              resetGameData();
              notifications.show({
                title: "Game data reset!",
                message: "Now you can relive the whole progress.",
                color: "teal",
                autoClose: 3000,
                style: {
                  transform: `translateY(${isMobile ? "-60px" : "0"})`,
                },
              });
              close();
            }}
          >
            Yes, reset!
          </Button>
          <Button onClick={close} variant="transparent" c="black">
            Cancel
          </Button>
        </Group>
      </Modal>
      <Stack>
        <Title order={2}>Reset game data</Title>
        <Button size="lg" color="red" onClick={open} radius="xl">
          Reset
        </Button>
      </Stack>
    </>
  );
};

export default ResetGameData;
