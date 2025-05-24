import { Box, Button, Flex, Image, Indicator, NumberFormatter, Text } from "@mantine/core";
import { useGame } from "../../../GameProvider";
import classes from "./index.module.css";

const UpgradeButton = ({ upgrade }: { upgrade: Upgrade }) => {
  const { money, buyUpgrade, currentCost, countUpgrade } = useGame();

  return (
    <Button
      variant="default"
      c="cbc-purple.9"
      h="fit-content"
      py="md"
      justify="flex-start"
      w="100%"
      disabled={currentCost(upgrade) > money || (!!upgrade.perClick && countUpgrade(upgrade) > 0)}
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
        >
          <Image
            src={upgrade.icon ? `/images/icons/${upgrade.icon}` : "/images/osaka.jpg"}
            alt="Upgrade"
            h={70}
            w={70}
          />
        </Indicator>
        <Box style={{ textAlign: "left" }}>
          <Text
            fw="bold"
            size="lg"
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: 1.5,
            }}
          >
            {upgrade.name}
          </Text>
          <Box>
            <Text size="xl" fw="bold">
              <NumberFormatter prefix="$" value={currentCost(upgrade)} thousandSeparator />
            </Text>
            {upgrade.perSecond && (
              <Text size="sm" c="dimmed">
                per second +{upgrade.perSecond}
              </Text>
            )}
            {upgrade.perClick && (
              <Text size="sm" c="dimmed">
                per click ={upgrade.perClick}
              </Text>
            )}
          </Box>
        </Box>
      </Flex>
    </Button>
  );
};

export default UpgradeButton;
