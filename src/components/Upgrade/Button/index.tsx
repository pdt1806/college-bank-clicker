import { Box, Button, Flex, Image, NumberFormatter, Text } from "@mantine/core";
import { useGame } from "../../../GameProvider";
import classes from "./index.module.css";

const UpgradeButton = ({ upgrade }: { upgrade: UpgradeType }) => {
  const { money, buyUpgrade } = useGame();

  return (
    <Button
      variant="default"
      // color="cbs.2"
      // c="cbs.0"
      h="fit-content"
      py="md"
      justify="flex-start"
      w="100%"
      disabled={upgrade.cost > money}
      className={classes.button}
      onClick={() => buyUpgrade(upgrade)}
      radius="lg"
    >
      <Flex gap="md" align="center">
        <Image src="/images/osaka.jpg" alt="Upgrade" h={90} w={90} />
        <Box style={{ textAlign: "left" }}>
          <Text fw="bold" size="lg" style={{ whiteSpace: "normal", wordBreak: "break-word", lineHeight: 1.5 }}>
            {upgrade.name}
          </Text>
          <Box>
            <Text size="xl" fw="bold">
              <NumberFormatter prefix="$" value={upgrade.cost} thousandSeparator />
            </Text>
            <Text size="sm" c="dimmed">
              per second +{upgrade.perSecondIncrease}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Button>
  );
};

export default UpgradeButton;
