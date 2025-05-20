import { HoverCard } from "@mantine/core";
import { forwardRef } from "react";
import UpgradeButton from "./Button";
import UpgradeInfo from "./Information";

const Upgrade = ({ upgrade }: { upgrade: UpgradeType }) => {
  const ButtonComponent = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>((props, ref) => (
    <div {...props} ref={ref}>
      <UpgradeButton upgrade={upgrade} />
    </div>
  ));

  return (
    <HoverCard width={400} shadow="md" withArrow openDelay={200}>
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
