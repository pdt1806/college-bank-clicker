import { HoverCard } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { forwardRef } from "react";
import UpgradeButton from "./Button";
import UpgradeInfo from "./Information";

const Upgrade = ({ upgrade }: { upgrade: Upgrade }) => {
  const isMobile = useMediaQuery("(max-width: 75em)");

  const ButtonComponent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>((props, ref) => (
    <div {...props} ref={ref}>
      <UpgradeButton upgrade={upgrade} />
    </div>
  ));

  return (
    <HoverCard width={400} shadow="md" withArrow openDelay={300} position="left" disabled={isMobile} radius="xl">
      <HoverCard.Target>
        <ButtonComponent />
      </HoverCard.Target>
      <HoverCard.Dropdown
        bg="cbc-bluegreen.0"
        style={{
          border: `3px solid ${
            upgrade.perClick ? "var(--mantine-color-cbc-yellow-9)" : "var(--mantine-color-cbc-bluegreen-9)"
          }`,
        }}
      >
        <UpgradeInfo upgrade={upgrade} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default Upgrade;
