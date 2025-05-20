import { Box, Group, Image, Stack, Text } from "@mantine/core";

const UpgradeInfo = ({ upgrade }: { upgrade: UpgradeType }) => {
  return (
    <Box>
      <Stack>
        <Group>
          <Image src="/images/osaka.jpg" alt="Upgrade" h={60} w={60} />
          <Box style={{ textAlign: "left" }}>
            <Text size="lg">{upgrade.name}</Text>
            <Text size="sm" c="dimmed">
              [owned: 0]
            </Text>
          </Box>
        </Group>
        <Text size="sm" c="dimmed">
          {upgrade.description}
        </Text>
        <Text size="sm" c="dimmed">
          Every upgrade increases the number of students per second by{" "}
          <span>
            <strong>{upgrade.perSecondIncrease}</strong>
          </span>{" "}
          and costs{" "}
          <span>
            <strong>{upgrade.cost}</strong>
          </span>{" "}
          students.
        </Text>
      </Stack>
    </Box>
  );
};

export default UpgradeInfo;
