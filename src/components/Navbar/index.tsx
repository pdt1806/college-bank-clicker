import { Image, Stack, Text } from "@mantine/core";
import { IconBackpack, IconChartBar, IconClick, IconInfoCircle, IconSettings, IconStar } from "@tabler/icons-react";
import { memo } from "react";
import { SidebarsStore } from "../../GameProvider/Stores/SidebarsStore";
import { NavbarLink } from "./Link";

const links: NavbarLink[] = [
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

  return (
    <Stack gap={0} justify="space-between" px="xs">
      <Image src="/assets/cbc-logo.svg" alt="Logo" w="100%" maw={400} mx="auto" py="md" />
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
