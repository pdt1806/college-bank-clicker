import { Avatar, Group, Image, Stack, Text } from "@mantine/core";
import { IconBackpack, IconChartBar, IconClick, IconInfoCircle, IconSettings, IconStar } from "@tabler/icons-react";
import { memo } from "react";
import { getDiscordUserAvatar } from "../../GameProvider/DiscordSDK";
import { DiscordStore } from "../../GameProvider/Stores/DiscordStore";
import { SidebarsStore } from "../../GameProvider/Stores/SidebarsStore";
import { NavbarLinkType } from "../../utils/types";
import { NavbarLink } from "./Link";

const links: NavbarLinkType[] = [
  { label: "Game", icon: IconClick, to: "/" },
  { label: "Achievements", icon: IconStar, to: "/achievements" },
  { label: "Inventory", icon: IconBackpack, to: "/inventory" },
  { label: "Statistics", icon: IconChartBar, to: "/statistics" },
  { label: "Settings", icon: IconSettings, to: "/settings" },
  { label: "About", icon: IconInfoCircle, to: "/about" },
];

const Navbar = () => {
  const toggleNavbar = SidebarsStore.getState().toggleNavbar;
  const navbarOpened = SidebarsStore((state) => state.navbarOpened);

  const isInDiscord = DiscordStore((state) => state.isInDiscord);
  const user = DiscordStore((state) => state.user);

  return (
    <Stack gap={0} justify="space-between" px="xs">
      <Image src="/assets/cbc-logo.svg" alt="Logo" w="100%" maw={400} mx="auto" py="md" />
      {isInDiscord && user ? (
        <Group
          p="xs"
          bg="cbc-bluegray.6"
          align="center"
          gap="xs"
          style={{ borderRadius: "var(--mantine-radius-xl)" }}
          mb="md"
        >
          <Avatar src={getDiscordUserAvatar(user)} alt="Avatar" radius="xl" size="lg" />
          <Text size="lg" fw={500} c="white" lineClamp={1}>
            {user.global_name || `${user.username}`}
          </Text>
        </Group>
      ) : null}
      {links.map((link) => (
        <NavbarLink link={link} navbarOpened={navbarOpened} toggleNavbar={toggleNavbar} key={link.label} />
      ))}
      <Text py="sm" px="xs" size="sm" c="cbc-bluegray.2">
        v{__APP_VERSION__}
      </Text>
    </Stack>
  );
};

export default memo(Navbar);
