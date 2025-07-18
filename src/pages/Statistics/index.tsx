import { Box, Divider, Table, Text, Title } from "@mantine/core";
import { memo } from "react";
import PageWrapper from "../../components/PageWrapper";
import { AchievementsDataStore } from "../../GameProvider/Stores/AchievementsDataStore";
import { GameDataStore } from "../../GameProvider/Stores/GameDataStore";
import { InventoryDataStore } from "../../GameProvider/Stores/InventoryDataStore";
import { StatsDataStore } from "../../GameProvider/Stores/StatsDataStore";
import { allAchievements } from "../../utils/achievements";
import { inventoryItems } from "../../utils/inventory";
import { allUpgrades } from "../../utils/upgrades";
import { StatsMaxMoney } from "./Values/MaxMoney";
import { StatsTimeInGame } from "./Values/TimeInGame";
import { StatsTotalMoney } from "./Values/TotalMoney";

const Statistics = () => {
  const totalUpgradesPurchased = GameDataStore((state) =>
    Object.values(state.upgrades).reduce((total, value) => total + value, 0)
  );
  const numberOfUpgradeTypes = GameDataStore((state) => Object.keys(state.upgrades).length);
  const achievementsCount = AchievementsDataStore((state) => Object.keys(state.achievements).length);
  const totalClicks = StatsDataStore.getState().totalClicks;
  const { firstAccess } = StatsDataStore.getState();
  const achievementRewardMultiplier = AchievementsDataStore((state) => state.achievementRewardMultiplier);
  const clickMultiplier = GameDataStore((state) => state.clickMultiplier);
  const secondMultiplier = GameDataStore((state) => state.secondMultiplier);
  const inventoryItemsCount = InventoryDataStore((state) => Object.keys(state.inventory).length);

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
      name: "Per-click multiplier",
      value: clickMultiplier,
    },
    {
      name: "Per-second multiplier",
      value: secondMultiplier,
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
      name: "Achievement reward multiplier",
      value: achievementRewardMultiplier,
    },
    {
      name: "Inventory items",
      value: `${inventoryItemsCount} / ${inventoryItems.length}`,
    },
    {
      name: "Total time in game",
      value: <StatsTimeInGame />,
    },
    {
      name: "First access to the game",
      value: new Date(firstAccess).toString().split(" GMT")[0],
    },
    {
      name: "Last time in game",
      value: (() => {
        const lastAccess = sessionStorage.getItem("lastAccess");
        return lastAccess ? new Date(lastAccess).toString().split(" GMT")[0] : "N/A";
      })(),
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

export default memo(Statistics);
