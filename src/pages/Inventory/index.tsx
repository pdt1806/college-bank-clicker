import { Divider, SimpleGrid, Text, Title } from "@mantine/core";
import { useMemo } from "react";
import InventoryBox from "../../components/InventoryBox";
import PageWrapper from "../../components/PageWrapper";
import { InventoryDataStore } from "../../GameProvider/Stores/InventoryDataStore";
import { inventoryItems } from "../../utils/inventory";
import { InventoryModal } from "./Modal";

export const Inventory = () => {
  const inventory = InventoryDataStore((state) => state.inventory);

  const processedInventoryItems = useMemo(() => {
    return inventoryItems
      .map((item) => {
        const date = inventory[item.id];
        return {
          ...item,
          date: date ? new Date(date) : undefined,
        };
      })
      .sort((a, b) => {
        if (a.date && b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
        else if (a.date && !b.date) return -1;
        else if (!a.date && b.date) return 1;
        else return 0;
      });
  }, [inventory]);

  const { open, element: ModalElement } = InventoryModal();

  return (
    <>
      {ModalElement}
      <PageWrapper>
        <Title pt="lg">Inventory</Title>
        <Divider mt="xl" mb="lg" />
        <Text pb="lg">
          {Object.keys(inventory).length} / {inventoryItems.length} items collected. Click on an item to view its
          details.
        </Text>
        <SimpleGrid cols={{ base: 4, xs: 5, sm: 6, md: 8, lg: 10 }} spacing="lg">
          {processedInventoryItems.map((item) => (
            <InventoryBox item={item} open={open} key={item.id} />
          ))}
        </SimpleGrid>
      </PageWrapper>
    </>
  );
};
