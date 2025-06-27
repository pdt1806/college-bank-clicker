import { Box, Button, Flex, Image, Indicator, NumberFormatter, Text } from "@mantine/core";
import { memo, useEffect, useRef, useState } from "react";
import { buyUpgrade, countUpgrade, currentCost, playSound } from "../../../GameProvider/GameActions";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
import { StatsDataStore } from "../../../GameProvider/Stores/StatsDataStore";
import { audio } from "../../../utils/audio";
import classes from "./index.module.css";

const UpgradeButton = ({ upgrade }: { upgrade: Upgrade }) => {
  const [element, setElement] = useState<HTMLButtonElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const isReached = StatsDataStore((state) => state.maxMoney >= upgrade.cost);

  const disabled = GameDataStore((state) => currentCost(upgrade) > state.money);

  const [displayedCost, setDisplayedCost] = useState<number>(currentCost(upgrade));

  useEffect(() => {
    if (buttonRef.current) {
      setElement(buttonRef.current);
    }
  }, []);

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
      onClick={() => {
        buyUpgrade(upgrade);
        setDisplayedCost(currentCost(upgrade));
      }}
      radius="xl"
      ref={buttonRef}
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
              <NumberFormatter prefix="$" value={displayedCost} thousandSeparator />
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

export default memo(UpgradeButton);
