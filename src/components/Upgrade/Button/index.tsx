import { Box, Button, Flex, Image, Indicator, NumberFormatter, Text } from "@mantine/core";
import { useGame } from "../../../GameProvider";
import classes from "./index.module.css";

const UpgradeButton = ({ upgrade }: { upgrade: Upgrade }) => {
  const { money, buyUpgrade, currentCost, countUpgrade, upgrades, maxMoney } = useGame();

  const isReached = Object.keys(upgrades).includes(upgrade.id) || maxMoney >= upgrade.cost;

  return (
    <Button
      color="cbc-bluegray.0"
      variant="filled"
      c="cbc-purple.9"
      h="fit-content"
      py="md"
      justify="flex-start"
      w="100%"
      disabled={currentCost(upgrade) > money || (!upgrade.perSecond && !!upgrades[upgrade.id])}
      bg={upgrades[upgrade.id] && upgrade.perClick ? "cbc-yellow.1" : "cbc-bluegray.0"}
      style={{
        border: upgrades[upgrade.id] && upgrade.perClick ? "3px solid var(--mantine-color-cbc-yellow-6)" : "none",
        opacity: money >= currentCost(upgrade) || (upgrades[upgrade.id] && upgrade.perClick) ? 1 : 0.5,
      }}
      className={classes.button}
      onClick={() => buyUpgrade(upgrade)}
      radius="lg"
    >
      <Flex gap="lg" align="center">
        <Indicator
          my="xs"
          size={25}
          color="cbc-yellow"
          withBorder
          position="bottom-end"
          offset={5}
          label={countUpgrade(upgrade)}
          style={{ zIndex: 0 }}
        >
          <Image
            src={`/assets/upgrades/${upgrade.id}.svg`}
            alt="Upgrade"
            h={70}
            w={70}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/assets/osaka.jpg"; // Fallback image
            }}
          />
        </Indicator>
        <Box style={{ textAlign: "left" }}>
          <Text
            fw="500"
            size="lg"
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: 1.5,
            }}
          >
            {isReached ? upgrade.name : "???"}
          </Text>
          <Box>
            <Text size="xl" fw="bold">
              <NumberFormatter prefix="$" value={currentCost(upgrade)} thousandSeparator />
            </Text>
            {upgrade.perSecond && isReached && (
              <Text size="sm" c="dimmed">
                per second +{upgrade.perSecond}
              </Text>
            )}
            {upgrade.perClick && isReached && (
              <Text size="sm" c="dimmed">
                per click +{upgrade.perClick}
              </Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Button>
  );
};

export default UpgradeButton;
