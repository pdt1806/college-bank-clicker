import { Box, Button, Flex, Image, Text } from "@mantine/core";
import { useContext } from "react";
import { GameContext } from "../../../GameProvider";

const UpgradeButton = ({ upgrade }: { upgrade: UpgradeType }) => {
  const { students, buyUpgrade } = useContext(GameContext);

  return (
    <Button
      variant="default"
      h="fit-content"
      py="md"
      justify="flex-start"
      w="100%"
      disabled={upgrade.cost > students}
      onClick={() => buyUpgrade(upgrade)}
    >
      <Flex gap="md" align="center">
        <Image src="/images/osaka.jpg" alt="Upgrade" h={80} w={80} />
        <Box style={{ textAlign: "left" }}>
          <Text size="lg" style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
            {upgrade.name}
          </Text>
          <Text size="sm" c="dimmed">
            {upgrade.cost} students
          </Text>
        </Box>
      </Flex>
    </Button>
  );
};

export default UpgradeButton;
