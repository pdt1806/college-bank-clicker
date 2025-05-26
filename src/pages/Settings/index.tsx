import { Box, Container, Text, Title } from "@mantine/core";

const Settings = () => {
  return (
    <Container size="xl" py="xl" c="white">
      <Title>Settings</Title>
      <Box mt="md">
        <Text size="lg">Settings page is under development.</Text>
        <Text size="sm" c="dimmed">
          Please check back later for more options.
        </Text>
      </Box>
    </Container>
  );
};

export default Settings;
