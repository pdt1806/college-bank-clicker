import { Box, Flex, Image, NumberFormatter, Stack, Table, Text } from "@mantine/core";
import { memo } from "react";
import { countUpgrade, currentCost } from "../../../GameProvider/GameActions";
import { GameDataStore } from "../../../GameProvider/Stores/GameDataStore";
import { StatsDataStore } from "../../../GameProvider/Stores/StatsDataStore";
import { Upgrade } from "../../../utils/types";

const UpgradeInfo = ({ upgrade }: { upgrade: Upgrade }) => {
  const isReached = StatsDataStore((state) => state.maxMoney >= upgrade.cost);

  GameDataStore((state) => state.upgrades); // re-render on upgrades change

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
              {isReached ? upgrade.name : "???"}
            </Text>
            <Text size="sm" c="cbc-purple.9">
              Owned: {countUpgrade(upgrade)}
            </Text>
          </Box>
        </Flex>
        <Text size="sm" c="cbc-purple.9">
          {isReached ? upgrade.description : "Reach this upgrade to see what it really is (including its stats)!"}
        </Text>
        {isReached && (
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
        )}
      </Stack>
    </Box>
  );
};

export default memo(UpgradeInfo);
