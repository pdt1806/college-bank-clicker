import { Flex, Image, Stack, Text, Title } from "@mantine/core";
import { IconDeviceUnknownFilled } from "@tabler/icons-react";
import { InventoryItem } from "../../../utils/types";

const InventoryItemInformation = ({ item }: { item: InventoryItem }) => {
  return (
    <Flex direction="row" align="center" gap="lg">
      {item.date ? (
        <Image
          // src={`/assets/inventory/${item.id}.svg`}
          alt={item.name}
          h={120}
          w={120}
          src={`/assets/inventory/${item.id}.svg`}
          fallbackSrc="/assets/pearto.webp"
        />
      ) : (
        <IconDeviceUnknownFilled width={120} height={120} color="var(--mantine-color-cbc-bluegray-5)" />
      )}
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
