import { Box, Button, Flex, Image, Indicator, NumberFormatter, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useGame } from "../../../GameProvider";
import { audio } from "../../../utils/audio";
import classes from "./index.module.css";

const UpgradeButton = ({ upgrade }: { upgrade: Upgrade }) => {
  const { money, buyUpgrade, currentCost, countUpgrade, maxMoney, playSound } = useGame();

  const [element, setElement] = useState<HTMLButtonElement | null>(null);

  const isReached = maxMoney >= upgrade.cost;

  const disabled = currentCost(upgrade) > money;

  useEffect(() => {
    if (!element) return;
    if (!disabled) {
      playSound(audio.isReached);
      element.classList.add(classes.pop);
      setTimeout(() => {
        element.classList.remove(classes.pop);
      }, 300);
    }
  }, [disabled]);

  return (
    <Button
      color="cbc-bluegreen.0"
      variant="filled"
      c="cbc-purple.9"
      h="fit-content"
      py="md"
      justify="flex-start"
      w="100%"
      disabled={disabled}
      bg="cbc-bluegreen.0"
      className={classes.button}
      onClick={() => buyUpgrade(upgrade)}
      radius="xl"
      onLoad={(e) => setElement(e.currentTarget as HTMLButtonElement)}
      style={{
        border: `4px solid ${
          upgrade.perClick ? "var(--mantine-color-cbc-yellow-9)" : "var(--mantine-color-cbc-bluegreen-9)"
        }`,
      }}
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
