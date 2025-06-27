import { Button, Image, Stack, Text, Title } from "@mantine/core";
import { IconChartBar, IconClick, IconInfoCircle, IconSettings, IconStar } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import useSound from "use-sound";
import { SettingsDataStore } from "../../GameProvider/Stores/SettingsDataStore";
import { audio } from "../../utils/audio";

const links = [
  { label: "Game", icon: IconClick, to: "/" },
  { label: "Achievements", icon: IconStar, to: "/achievements" },
  { label: "Statistics", icon: IconChartBar, to: "/statistics" },
  { label: "Settings", icon: IconSettings, to: "/settings" },
  { label: "About", icon: IconInfoCircle, to: "/about" },
];

const Navbar = ({ navbarOpened, toggleNavbar }: { navbarOpened: boolean; toggleNavbar: () => void }) => {
  // const navigate = useNavigate();
  const location = useLocation();

  const { sfxVolume } = SettingsDataStore.getState();
  const sfxMutedIOS = SettingsDataStore((state) => state.sfxMutedIOS);

  const [playSound] = useSound(audio.pop3, {
    volume: sfxVolume / 100,
    soundEnabled: !sfxMutedIOS,
  });

  return (
    <Stack gap={0} justify="space-between" px="xs">
      <Image src="/assets/cbc-logo.svg" alt="Logo" w="100%" maw={400} mx="auto" py="md" />
      {links.map((link) => (
        <Link key={link.label} to={link.to} style={{ textDecoration: "none", width: "100%" }}>
          <Button
            onClick={() => {
              navbarOpened && toggleNavbar();
              playSound();
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
        </Link>
      ))}

      <Text py="sm" px="xs" size="sm" c="cbc-bluegray.2">
        v{__APP_VERSION__}
      </Text>
    </Stack>
  );
};

export default Navbar;
