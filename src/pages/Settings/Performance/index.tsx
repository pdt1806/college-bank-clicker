import { NumberInput, Stack, Table, Title } from "@mantine/core";
import { useSettingsData } from "../../../GameProvider/Contexts/SettingsDataContext";
import { audio } from "../../../utils/audio";

const SettingsPerformance = () => {
  const { TPS, setTPS, playSound } = useSettingsData();

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
                    playSound(audio.pop);
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
