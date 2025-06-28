import { NumberInput, Stack, Table, Title } from "@mantine/core";
import { useShallow } from "zustand/shallow";
import { playSound } from "../../../GameProvider/SoundManager";
import { SettingsDataStore } from "../../../GameProvider/Stores/SettingsDataStore";

const SettingsPerformance = () => {
  const { TPS, setTPS } = SettingsDataStore(
    useShallow(({ TPS, setTPS }) => ({
      TPS,
      setTPS,
    }))
  );

  return (
    <Stack w="100%">
      <Title order={2} fw={500}>
        Performance
      </Title>
      <Table verticalSpacing="sm" withRowBorders={false}>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th p="0">
              <Title order={4} fw={400}>
                Ticks per second
              </Title>
            </Table.Th>
            <Table.Td w="70%">
              <NumberInput
                description="Higher TPS means smoother experience but more battery consumed, lower TPS means less battery usage. Range: 10-60"
                placeholder="25"
                variant="filled"
                color="cbc-purple"
                value={TPS}
                onChange={(value) => {
                  if (typeof value == "number") {
                    setTPS(value);
                    playSound("pop");
                  }
                }}
                min={10}
                max={60}
                size="md"
                radius="lg"
              />
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Stack>
  );
};

export default SettingsPerformance;
