import { Box, Group, Image, NumberFormatter, Stack, Text } from "@mantine/core";
import { useGame } from "../../../GameProvider";

const UpgradeInfo = ({ upgrade }: { upgrade: UpgradeType }) => {
  const { upgrades } = useGame();

  return (
    <Box>
      <Stack>
        <Group>
          <Image src="/images/osaka.jpg" alt="Upgrade" h={60} w={60} />
          <Box style={{ textAlign: "left" }}>
            <Text size="lg">{upgrade.name}</Text>
            <Text size="sm" c="dimmed">
              Owned: {upgrades.filter((u) => u.id === upgrade.id).length}
            </Text>
          </Box>
        </Group>
        <Text size="sm" c="dimmed">
          {upgrade.description}
        </Text>
        <Text size="sm" c="dimmed">
          Every upgrade increases the amount of money per second by{" "}
          <span>
            <strong>{upgrade.perSecondIncrease}</strong>
          </span>{" "}
          and costs{" "}
          <span>
            <strong>
              <NumberFormatter prefix="$" value={upgrade.cost} thousandSeparator />
            </strong>
          </span>{" "}
        </Text>
      </Stack>
    </Box>
  );
};

export default UpgradeInfo;
