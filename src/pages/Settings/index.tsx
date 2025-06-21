import { Divider, SimpleGrid, Title } from "@mantine/core";
import PageWrapper from "../../components/PageWrapper";
import AudioSettings from "./AudioSettings";

import ExportImportGameData from "./ExportImportGameData";
import ResetGameData from "./ResetGameData";

const Settings = () => {
  return (
    <PageWrapper>
      <Title pt="lg">Settings</Title>
      <Divider my="xl" />
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        <AudioSettings />
        <ExportImportGameData />
        <ResetGameData />
      </SimpleGrid>
    </PageWrapper>
  );
};

export default Settings;
