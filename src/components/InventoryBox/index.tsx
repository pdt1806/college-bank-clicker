import { Box, HoverCard, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { memo } from "react";
import { InventoryItem } from "../../utils/types";
import InventoryItemInformation from "./Information";

const InventoryBox = ({ item }: { item: InventoryItem }) => {
  const isMobile = useMediaQuery("(max-width: 75em)");

  return (
    <HoverCard width={400} shadow="md" withArrow openDelay={300} disabled={isMobile} radius="xl">
      <HoverCard.Target>
        <Box
          h="100%"
          w="100%"
          bg="cbc-bluegray.0"
          p="md"
          style={{ borderRadius: "var(--mantine-radius-lg)", opacity: item.date ? 1 : 0.5 }}
          // className="cursor-pointer"
          key={item.id}
          // onClick={() => open(item)}
          // don't use modal for now
        >
          <Image
            src={`/assets/inventory/${item.id}.svg`}
            // src="/assets/pearto.webp" // Placeholder for the actual image path
            fallbackSrc="/assets/pearto.webp"
            alt={item.name}
            w="100%"
            h="auto"
          />
        </Box>
      </HoverCard.Target>
      <HoverCard.Dropdown w="max-content" maw={450} style={{ border: "3px solid var(--mantine-color-cbc-purple-8)" }}>
        <InventoryItemInformation item={item} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default memo(InventoryBox);
