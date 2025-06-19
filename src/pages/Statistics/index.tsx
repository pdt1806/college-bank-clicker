import { Box, Divider, NumberFormatter, Table, Text, Title } from "@mantine/core";
import prettyMilliseconds from "pretty-ms";
import PageWrapper from "../../components/PageWrapper";
import { useGame } from "../../GameProvider";
import { allAchievements } from "../../utils/achievements";
import { allUpgrades } from "../../utils/upgrades";

const Statistics = () => {
  const { totalClicks, totalMoney, upgrades, achievements, timeInGame } = useGame();

  const table = [
    {
      name: "Total money earned",
      value: <NumberFormatter prefix="$" value={Math.trunc(totalMoney)} thousandSeparator decimalScale={0} />,
    },
    {
      name: "Total manual clicks",
      value: totalClicks,
    },
    {
      name: "Total upgrades purchased",
      value: upgrades ? Object.values(upgrades).reduce((total, value) => total + value, 0) : 0,
    },
    {
      name: "Number of different upgrades",
      value: `${upgrades ? Object.keys(upgrades).length : 0} / ${allUpgrades.length}`,
    },
    {
      name: "Achievements earned",
      value: `${achievements.length} / ${allAchievements.length}`,
    },
    {
      name: "Total time in game",
      value: prettyMilliseconds(timeInGame, {
        secondsDecimalDigits: 0,
      }),
    },
  ];

  return (
    <PageWrapper>
      <Title pt="lg">Statistics</Title>
      <Divider my="xl" />
      <Box
        style={{
          borderRadius: "var(--mantine-radius-lg)",
          overflow: "hidden",
        }}
      >
        <Table layout="fixed" verticalSpacing="lg" horizontalSpacing="lg" c="cbc-purple.9">
          <Table.Tbody>
            {table.map((row, index) => (
              <Table.Tr
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0 ? "var(--mantine-color-cbc-bluegray-1)" : "var(--mantine-color-cbc-bluegray-2)",
                }}
              >
                <Table.Th>
                  <Title order={4} fw={500}>
                    {row.name}
                  </Title>
                </Table.Th>
                <Table.Td>
                  <Text fw={500}>{row.value}</Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    </PageWrapper>
  );
};

export default Statistics;
