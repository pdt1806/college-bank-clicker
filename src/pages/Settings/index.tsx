import { Divider, SimpleGrid, Title } from "@mantine/core";
import PageWrapper from "../../components/PageWrapper";
import AudioSettings from "./AudioSettings";

import { useOs } from "@mantine/hooks";
import { memo } from "react";
import { CustomCursorsSettings } from "./CustomCursors";
import ExportImportGameData from "./ExportImportGameData";
import { OfflineModeSettings } from "./OfflineMode";
import TPSSettings from "./Performance";
import ResetGameData from "./ResetGameData";

const Settings = () => {
  const os = useOs();

  const isNotMobile = os !== "ios" && os !== "android";

  return (
    <PageWrapper>
      <Title pt="lg">Settings</Title>
      <Divider my="xl" />
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        <AudioSettings />
        {isNotMobile && <CustomCursorsSettings />}
        <TPSSettings />
        <OfflineModeSettings />
        <ExportImportGameData />
        <ResetGameData />
      </SimpleGrid>
    </PageWrapper>
  );
};

export default memo(Settings);
