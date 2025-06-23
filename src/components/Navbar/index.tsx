import { Button, Image, Stack, Text, Title } from "@mantine/core";
import { IconChartBar, IconClick, IconInfoCircle, IconSettings, IconStar } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSettingsData } from "../../GameProvider/Contexts/SettingsDataContext";
import { audio } from "../../utils/audio";

const links = [
  { label: "Game", icon: IconClick, to: "/" },
  { label: "Achievements", icon: IconStar, to: "/achievements" },
  { label: "Statistics", icon: IconChartBar, to: "/statistics" },
  { label: "Settings", icon: IconSettings, to: "/settings" },
  { label: "About", icon: IconInfoCircle, to: "/about" },
];

const Navbar = ({ navbarOpened, toggleNavbar }: { navbarOpened: boolean; toggleNavbar: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { playSound } = useSettingsData();

  return (
    <Stack gap={0} justify="space-between" px="xs">
      <Image src="/assets/cbc-logo.svg" alt="Logo" w="100%" maw={400} mx="auto" py="md" />
      {links.map((link) => (
        <Button
          key={link.label}
          onClick={() => {
            navigate(link.to, { replace: true });
            navbarOpened && toggleNavbar();
            playSound(audio.pop3);
          }}
          variant={location.pathname === link.to ? "filled" : "subtle"}
          color={location.pathname === link.to ? "cbc-bluegray.6" : "cbc-bluegray.0"}
          c="white"
          leftSection={<link.icon size={24} />}
          fullWidth
          radius="xl"
          w="100%"
          justify="flex-start"
          py="md"
          px="xs"
          h="auto"
          {...(location.pathname === link.to ? { bg: "cbc-bluegray.6" } : {})}
        >
          <Title order={4} fw={400}>
            {link.label}
          </Title>
        </Button>
      ))}

      <Text py="sm" px="xs" size="sm" c="cbc-bluegray.2">
        v{__APP_VERSION__}
      </Text>
    </Stack>
  );
};

export default Navbar;
