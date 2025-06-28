import { Button, Title } from "@mantine/core";
import { Link, useLocation } from "@tanstack/react-router";
import { playSound } from "../../../GameProvider/SoundManager";

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

  return (
    <Link to={link.to} style={{ textDecoration: "none", width: "100%" }}>
      <Button
        onClick={() => {
          navbarOpened && toggleNavbar();
          playSound("pop3");
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
  );
};
