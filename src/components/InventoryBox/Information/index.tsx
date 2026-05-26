import { Flex, Image, Stack, Text, Title } from "@mantine/core";
import { InventoryItem } from "../../../utils/types";

const InventoryItemInformation = ({ item }: { item: InventoryItem }) => {
  return (
    <Flex direction="row" align="center" gap="lg">
      <Image
        // src={`/assets/inventory/${item.id}.svg`}
        alt={item.name}
        h={120}
        w={120}
        style={{ borderRadius: "var(--mantine-radius-lg)" }}
        src={`/assets/inventory/${item.id}.svg`}
        fallbackSrc="/assets/pearto.webp"
      />
      <Stack>
        <Title order={3} fw={500} mt="xs">
          {item.date ? item.name : "???"}
        </Title>
        <Text c="dimmed">{item.date ? item.description : "Unlock to see what this item does."}</Text>
        <Text c="dimmed">{item.method}</Text>
        {item.date && <Text c="dimmed">Date collected: {new Date(item.date).toLocaleDateString()}</Text>}
      </Stack>
    </Flex>
  );
};

export default InventoryItemInformation;
