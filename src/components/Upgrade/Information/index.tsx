import {
  Box,
  Group,
  Image,
  NumberFormatter,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useGame } from "../../../GameProvider";

const UpgradeInfo = ({ upgrade }: { upgrade: Upgrade }) => {
  const { upgrades, countUpgrade, currentCost } = useGame();

  return (
    <Box>
      <Stack>
        <Group>
          <Image src="/images/osaka.jpg" alt="Upgrade" h={60} w={60} />
          <Box style={{ textAlign: "left" }}>
            <Text size="lg" c="cbs.0">
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
        <Table c="dimmed">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Current cost</Table.Th>
              <Table.Th>Per second</Table.Th>
              <Table.Th>Cost factor</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr key={upgrade.id}>
              <Table.Td>
                <NumberFormatter
                  prefix="$"
                  value={currentCost(upgrade)}
                  thousandSeparator
                />
              </Table.Td>
              <Table.Td>{upgrade.perSecond}</Table.Td>
              <Table.Td>{upgrade.costFactor}</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Stack>
    </Box>
  );
};

export default UpgradeInfo;
