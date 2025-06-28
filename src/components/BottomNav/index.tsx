import { Box, Button, Flex, Stack, Text } from "@mantine/core";
import { IconMenu2, IconShoppingCart } from "@tabler/icons-react";
import { playSound } from "../../GameProvider/SoundManager";

const BottomNav = ({
  toggleAside,
  toggleNavbar,
  closeAside,
  closeNavbar,
}: {
  toggleAside: () => void;
  toggleNavbar: () => void;
  closeAside: () => void;
  closeNavbar: () => void;
}) => {
  const links = [
    {
      label: "Menu",
      icon: IconMenu2,
      action: () => {
        closeAside();
        toggleNavbar();
      },
    },
    {
      label: "Upgrades",
      icon: IconShoppingCart,
      action: () => {
        closeNavbar();
        toggleAside();
      },
    },
  ];

  return (
    <Box w="100vw" h={60} bg="cbc-bluegray.9" style={{ position: "fixed", bottom: 0, zIndex: 2 }}>
      <Flex align="center" h="100%">
        {links.map((link) => (
          <Button
            h={60}
            w="50vw"
            variant="subtle"
            color="white"
            onClick={() => {
              link.action();
              playSound("pop3");
            }}
            radius="0"
            key={link.label}
          >
            <Stack gap={2}>
              <link.icon size={24} color="white" style={{ margin: "auto" }} />
              <Text size="xs" c="white" style={{ textAlign: "center" }}>
                {link.label}
              </Text>
            </Stack>
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default BottomNav;
