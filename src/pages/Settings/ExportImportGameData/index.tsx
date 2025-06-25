import {
  Button,
  FileButton,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  exportAllGame,
  importAllGame,
} from "../../../GameProvider/GameActions";
import classes from "./index.module.css"; // Assuming you have a CSS module for styles

const ExportImportGameData = () => {
  return (
    <Stack>
      <Title order={2} fw={500}>
        Export/Import game data
      </Title>
      <Text c="dimmed">
        Export your game data to a JSON file, or import it from a file to
        restore your progress. Importing will overwrite your current game data.
      </Text>
      <SimpleGrid cols={2}>
        <Button size="lg" color="cbc-green" radius="xl" onClick={exportAllGame}>
          Export
        </Button>
        <FileButton
          onChange={(file) => {
            if (file) importAllGame(file);
          }}
          name="Import"
          accept=".json"
        >
          {(props) => (
            <Button
              {...props}
              component="label"
              size="lg"
              color="cbc-teal"
              radius="xl"
              className={classes.cursorPointer}
            >
              Import
            </Button>
          )}
        </FileButton>
      </SimpleGrid>
    </Stack>
  );
};

export default ExportImportGameData;
