import { HoverCard } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { forwardRef } from "react";
import UpgradeButton from "./Button";
import UpgradeInfo from "./Information";

const Upgrade = ({ upgrade }: { upgrade: Upgrade }) => {
  const isMobile = useMediaQuery("(max-width: 62em)");

  const ButtonComponent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>((props, ref) => (
    <div {...props} ref={ref}>
      <UpgradeButton upgrade={upgrade} />
    </div>
  ));

  return (
    <HoverCard width={400} shadow="md" withArrow openDelay={300} position="left" disabled={isMobile} radius="lg">
      <HoverCard.Target>
        <ButtonComponent />
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <UpgradeInfo upgrade={upgrade} />
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default Upgrade;
