import { ActionIcon } from "@mantine/core";
import { IconChevronUp } from "@tabler/icons-react";
import { useGame } from "../../../GameProvider";
import { audio } from "../../../utils/audio";

const DropdownButton = ({ tab }: { tab: UpgradeBarTab }) => {
  const { playSound } = useGame();
  return (
    <ActionIcon
      variant="transparent"
      color="white"
      onClick={() => {
        tab.function();
        playSound(audio.dropdown);
      }}
    >
      <IconChevronUp
        stroke={2}
        style={{
          transform: tab.controller ? "rotate(0deg)" : "rotate(-180deg)",
          transition: "transform 0.1s",
        }}
      />
    </ActionIcon>
  );
};

export default DropdownButton;
