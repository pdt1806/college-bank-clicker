import { Box, Image } from "@mantine/core";
import { memo } from "react";

const InventoryBox = ({ item, open }: { item: InventoryItem; open: (item: InventoryItem) => void }) => {
  return (
    <Box
      h="100%"
      w="100%"
      bg="cbc-bluegray.0"
      p="xs"
      style={{ borderRadius: "var(--mantine-radius-lg)", opacity: item.date ? 1 : 0.5 }}
      className="cursor-pointer"
      key={item.id}
      onClick={() => open(item)}
    >
      <Image src={"/assets/pearto.webp"} alt={item.name} w="100%" h="auto" />
    </Box>
  );
};

export default memo(InventoryBox);
