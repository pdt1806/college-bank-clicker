import { Box, Flex, Image, NumberFormatter, Stack, Table, Text } from "@mantine/core";
import { useGame } from "../../../GameProvider";

const UpgradeInfo = ({ upgrade }: { upgrade: Upgrade }) => {
  const { countUpgrade, currentCost } = useGame();

  return (
    <Box>
      <Stack>
        <Flex gap="md" align="center">
          <Image
            src={`/assets/upgrades/${upgrade.id}.svg`}
            alt="Upgrade"
            h={70}
            w={70}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/assets/osaka.jpg"; // Fallback image
            }}
          />
          <Box style={{ textAlign: "left" }}>
            <Text
              size="lg"
              c="cbc-purple.9"
              fw="500"
              style={{
                whiteSpace: "normal",
                wordBreak: "break-word",
                lineHeight: 1.5,
              }}
            >
              {upgrade.name}
            </Text>
            <Text size="sm" c="cbc-purple.9">
              Owned: {countUpgrade(upgrade)}
            </Text>
          </Box>
        </Flex>
        <Text size="sm" c="cbc-purple.9">
          {upgrade.description}
        </Text>
        {upgrade.perClick && (
          <Text size="sm" c="cbc-purple.9">
            Manual upgrade is one time only.
          </Text>
        )}
        <Table c="cbc-purple.9">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Current cost</Table.Th>
              {upgrade.perSecond && <Table.Th>Per second</Table.Th>}
              {upgrade.perClick && <Table.Th>Per click</Table.Th>}
              {upgrade.costMultiplier && <Table.Th>Cost multiplier</Table.Th>}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr key={upgrade.id}>
              <Table.Td>
                <NumberFormatter prefix="$" value={currentCost(upgrade)} thousandSeparator />
              </Table.Td>
              <Table.Td>+{upgrade.perSecond ?? upgrade.perClick}</Table.Td>
              <Table.Td>{upgrade.costMultiplier}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Stack>
    </Box>
  );
};

export default UpgradeInfo;
