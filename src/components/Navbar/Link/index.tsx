import { Button, Title } from "@mantine/core";
import { Link, useLocation } from "@tanstack/react-router";
import { playSound } from "../../../GameProvider/SoundManager";
import { DiscordStore } from "../../../GameProvider/Stores/DiscordStore";

export const NavbarLink = ({
  link,
  navbarOpened,
  toggleNavbar,
}: {
  link: NavbarLink;
  navbarOpened: boolean;
  toggleNavbar: () => void;
}) => {
  const location = useLocation();
  const isActive = location.pathname === link.to;
  const { setCurrentPage } = DiscordStore.getState();

  return (
    <Link to={link.to} style={{ textDecoration: "none", width: "100%" }} onClick={() => setCurrentPage(link.label)}>
      <Button
        onClick={() => {
          navbarOpened && toggleNavbar();
          playSound("pop3");
        }}
        variant={isActive ? "filled" : "subtle"}
        color={isActive ? "cbc-bluegray.7" : "cbc-bluegray.0"}
        c="white"
        leftSection={<link.icon size={24} />}
        fullWidth
        radius="xl"
        w="100%"
        justify="flex-start"
        py="md"
        px="xs"
        h="auto"
        {...(isActive ? { bg: "cbc-bluegray.7" } : {})}
      >
        <Title order={4} fw={isActive ? 600 : 400}>
          {link.label}
        </Title>
      </Button>
    </Link>
  );
};
