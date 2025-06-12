import { Container, Divider, SimpleGrid, Title } from "@mantine/core";
import AudioSettings from "./AudioSettings";
import ResetGameData from "./ResetGameData";

const Settings = () => {
  return (
    <Container size="xl" py="xl" c="white">
      <Title>Settings</Title>
      <Divider my="xl" />
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        <AudioSettings />
        <ResetGameData />
      </SimpleGrid>
    </Container>
  );
};

export default Settings;
