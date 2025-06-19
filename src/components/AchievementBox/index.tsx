import { Box, Stack, Text } from "@mantine/core";
import { IconArrowUp, IconMoneybag, IconMouse } from "@tabler/icons-react";

const AchievementBox = ({ achievement }: { achievement: Achievement }) => {
  return (
    <Box style={{ borderRadius: "var(--mantine-radius-lg)" }} h="100%" w="100%" bg="cbc-bluegray.0" p="md">
      <Stack gap="lg" align="center" ta="center">
        {/* <Image
          src={`/assets/achievements/${achievement.id}.svg`}
          radius="lg"
          alt="Upgrade"
          h={125}
          w={125}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/assets/osaka.jpg"; // Fallback image
          }}
        /> */}
        {achievement.id.includes("money") && <IconMoneybag size={125} color="var(--mantine-color-cbc-teal-8)" />}
        {achievement.id.includes("click") && <IconMouse size={125} color="var(--mantine-color-cbc-teal-8)" />}
        {achievement.id.includes("upgrade") && <IconArrowUp size={125} color="var(--mantine-color-cbc-teal-8)" />}

        <Box>
          <Text
            fw="500"
            c="cbc-purple.9"
            size="lg"
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: 1.5,
            }}
          >
            {achievement.name}
          </Text>
          <Text size="sm" c="dimmed" mt="xs">
            {achievement.description}
          </Text>
          {achievement.date && (
            <Text size="sm" c="dimmed" mt="xs">
              Date achieved: {new Date(achievement.date).toLocaleDateString()}
            </Text>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default AchievementBox;
