import { Button, FileButton, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useGame } from "../../../GameProvider";

const ExportImportGameData = () => {
  const { exportGameData, importGameData } = useGame();

  return (
    <Stack>
      <Title order={2} fw={500}>
        Export/Import game data
      </Title>
      <Text c="dimmed">Export your game data to a JSON file, or import it from a file to restore your progress.</Text>
      <SimpleGrid cols={2}>
        <Button size="lg" color="cbc-green" radius="xl" onClick={exportGameData}>
          Export
        </Button>
        <FileButton
          // @ts-expect-error: File should be a single file
          onChange={importGameData}
          accept=".json"
        >
          {(props) => (
            <Button {...props} component="label" size="lg" color="cbc-teal" radius="xl">
              Import
            </Button>
          )}
        </FileButton>
      </SimpleGrid>
    </Stack>
  );
};

export default ExportImportGameData;
