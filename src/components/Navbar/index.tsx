import { Box, Button, Image, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { IconChartBar, IconClick, IconCompass, IconInfoCircle, IconSettings, IconStar } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const links = [
  { label: "Game", icon: IconClick, to: "/" },
  { label: "Guide", icon: IconCompass, to: "/guide" },
  { label: "Stats", icon: IconChartBar, to: "/stats" },
  { label: "Achievements", icon: IconStar, to: "/achievements" },
  { label: "Settings", icon: IconSettings, to: "/settings" },
  { label: "About", icon: IconInfoCircle, to: "/about" },
];

const Navbar = ({ navbarOpened, toggleNavbar }: { navbarOpened: boolean; toggleNavbar: () => void }) => {
  const navigate = useNavigate();

  return (
    <ScrollArea.Autosize h="100%" bg="cbc-bluegray.8">
      <Stack gap={0} justify="space-between">
        <Box>
          <Image src="/assets/cbc-logo.svg" alt="Logo" w="100%" py="md" px="xs" maw={400} mx="auto" />
          <Box>
            {links.map((link) => (
              <Button
                key={link.label}
                onClick={() => {
                  navigate(link.to, { replace: true });
                  navbarOpened && toggleNavbar();
                }}
                variant="filled"
                color="cbc-bluegray.8"
                leftSection={<link.icon size={24} />}
                fullWidth
                radius={0}
                justify="flex-start"
                py="md"
                px="lg"
                h="auto"
              >
                <Title order={4} fw={400}>
                  {link.label}
                </Title>
              </Button>
            ))}
          </Box>
        </Box>
        <Text py="sm" px="lg" size="sm" c="cbc-bluegray.2">
          v{__APP_VERSION__}
        </Text>
      </Stack>
    </ScrollArea.Autosize>
  );
};

export default Navbar;
