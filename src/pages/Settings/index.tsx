import { Container, Divider, SimpleGrid, Title } from "@mantine/core";
import AudioSettings from "./AudioSettings";
import ResetGameData from "./ResetGameData";

const Settings = () => {
  return (
    <Container size="xl" py="xs" c="white">
      <Title pt="lg">Settings</Title>
      <Divider my="xl" />
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        <AudioSettings />
        <ResetGameData />
      </SimpleGrid>
    </Container>
  );
};

export default Settings;
