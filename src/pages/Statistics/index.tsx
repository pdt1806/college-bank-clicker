import { Box, Divider, Table, Text, Title } from "@mantine/core";
import { memo } from "react";
import PageWrapper from "../../components/PageWrapper";
import { AchievementsDataStore } from "../../GameProvider/Stores/AchievementsDataStore";
import { GameDataStore } from "../../GameProvider/Stores/GameDataStore";
import { StatsDataStore } from "../../GameProvider/Stores/StatsDataStore";
import { allAchievements } from "../../utils/achievements";
import { allUpgrades } from "../../utils/upgrades";
import { StatsMaxMoney } from "./Values/MaxMoney";
import { StatsTimeInGame } from "./Values/TimeInGame";
import { StatsTotalMoney } from "./Values/TotalMoney";

const Statistics = () => {
  // const { totalMoney, maxMoney, timeInGame, totalClicks } = StatsDataStore(
  //   useShallow(({ totalMoney, maxMoney, timeInGame, totalClicks }) => ({
  //     totalMoney,
  //     maxMoney,
  //     timeInGame,
  //     totalClicks,
  //   }))
  // );

  const totalUpgradesPurchased = GameDataStore((state) =>
    Object.values(state.upgrades).reduce((total, value) => total + value, 0)
  );
  const numberOfUpgradeTypes = GameDataStore(
    (state) => Object.keys(state.upgrades).length
  );
  const achievementsCount = AchievementsDataStore(
    (state) => Object.keys(state.achievements).length
  );
  const totalClicks = StatsDataStore.getState().totalClicks;

  const table = [
    {
      name: "Total money earned",
      value: <StatsTotalMoney />,
    },
    {
      name: "Maximum money earned at some point",
      value: <StatsMaxMoney />,
    },
    {
      name: "Total manual clicks",
      value: totalClicks,
    },
    {
      name: "Total upgrades purchased",
      value: totalUpgradesPurchased,
    },
    {
      name: "Number of different upgrades",
      value: `${numberOfUpgradeTypes} / ${allUpgrades.length}`,
    },
    {
      name: "Achievements earned",
      value: `${achievementsCount} / ${allAchievements.length}`,
    },
    {
      name: "Total time in game",
      value: <StatsTimeInGame />,
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
        <Table
          layout="fixed"
          verticalSpacing="lg"
          horizontalSpacing="lg"
          c="cbc-purple.9"
        >
          <Table.Tbody>
            {table.map((row, index) => (
              <Table.Tr
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 0
                      ? "var(--mantine-color-cbc-bluegray-1)"
                      : "var(--mantine-color-cbc-bluegray-2)",
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

export default memo(Statistics);
