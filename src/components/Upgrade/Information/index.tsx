import { Box, Group, Image, NumberFormatter, Stack, Table, Text } from "@mantine/core";
import { useGame } from "../../../GameProvider";

const UpgradeInfo = ({ upgrade }: { upgrade: Upgrade }) => {
  const { countUpgrade, currentCost } = useGame();

  return (
    <Box>
      <Stack>
        <Group>
          <Image
            src={`/assets/upgrades/${upgrade.id}.svg`}
            alt="Upgrade"
            h={60}
            w={60}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/assets/osaka.jpg"; // Fallback image
            }}
          />
          <Box style={{ textAlign: "left" }}>
            <Text size="lg" c="cbc-purple.9">
              {upgrade.name}
            </Text>
            <Text size="sm" c="dimmed">
              Owned: {countUpgrade(upgrade)}
            </Text>
          </Box>
        </Group>
        <Text size="sm" c="dimmed">
          {upgrade.description}
        </Text>
        {upgrade.perClick && (
          <Text size="sm" c="dimmed">
            Manual upgrade is one time only.
          </Text>
        )}
        <Table c="dimmed">
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
              {upgrade.perSecond && <Table.Td>{upgrade.perSecond}</Table.Td>}
              {upgrade.perClick && <Table.Td>{upgrade.perClick}</Table.Td>}
              {upgrade.costMultiplier && <Table.Td>{upgrade.costMultiplier}</Table.Td>}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Stack>
    </Box>
  );
};

export default UpgradeInfo;
