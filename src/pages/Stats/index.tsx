import { Container, Divider, NumberFormatter, Table, Text, Title } from "@mantine/core";
import { useGame } from "../../GameProvider";

const Stats = () => {
  const { totalClicks, totalMoney, upgrades } = useGame();

  return (
    <Container size="xl" py="xs" c="white">
      <Title pt="lg">Statistics</Title>
      <Divider my="xl" />
      <Table layout="fixed" verticalSpacing="sm">
        <Table.Tbody>
          <Table.Tr>
            <Table.Th>
              <Title order={4} fw={500}>
                Total money earned
              </Title>
            </Table.Th>
            <Table.Td>
              <Text>
                <NumberFormatter prefix="$" value={Math.trunc(totalMoney)} thousandSeparator decimalScale={0} />
              </Text>
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>
              <Title order={4} fw={500}>
                Total manual clicks
              </Title>
            </Table.Th>
            <Table.Td>
              <Text>{totalClicks}</Text>
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>
              <Title order={4} fw={500}>
                Total upgrades purchased
              </Title>
            </Table.Th>
            <Table.Td>
              <Text>{upgrades ? Object.values(upgrades).reduce((total, value) => total + value, 0) : 0}</Text>
            </Table.Td>
          </Table.Tr>

          <Table.Tr>
            <Table.Th>
              <Title order={4} fw={500}>
                Number of different upgrades
              </Title>
            </Table.Th>
            <Table.Td>
              <Text>{upgrades ? Object.keys(upgrades).length : 0}</Text>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default Stats;
