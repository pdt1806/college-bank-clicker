import { Button, Modal, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export const PWAUpdateNotifier = () => {
  const [showReload, setShowReload] = useState(false);

  const { updateServiceWorker } = useRegisterSW({
    onOfflineReady() {
      console.log("✅ App is ready for offline use");
    },
    onNeedRefresh() {
      console.log("🔄 New version available");
      setShowReload(true);
    },
    onRegisteredSW() {
      console.log("✅ Service Worker registered");
    },
    onRegisterError(error) {
      console.error("❌ Service Worker registration failed:", error);
    },
    immediate: true,
  });

  const reloadApp = () => {
    updateServiceWorker(true); // forces update
    setShowReload(false);
  };

  // if (!showReload) return null;

  return (
    <Modal
      opened={showReload}
      onClose={reloadApp}
      centered
      radius="lg"
      c="cbc-purple.9"
      withCloseButton={false}
      size="xl"
      closeOnClickOutside={false}
      closeOnEscape={false}
    >
      <Stack>
        <Title order={3} fw={500} mt="xs">
          Update Available
        </Title>
        <Text>A new version of the app is available. Click the button below to reload and get the latest updates.</Text>
        <Button radius="md" color="cbc-purple" onClick={reloadApp} mt="md">
          Update
        </Button>
      </Stack>
    </Modal>
  );
};
