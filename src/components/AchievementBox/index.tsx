import { Box, Flex, Image, Text } from "@mantine/core";
import { useEffect } from "react";

const AchievementBox = ({ achievement }: { achievement: Achievement }) => {
  useEffect(() => {
    console.log("AchievementBox rendered for:", achievement);
  }, []);

  return (
    <Box style={{ borderRadius: "var(--mantine-radius-lg)" }} w="100%" bg="cbc-white.0" p="md">
      <Flex gap="lg" align="center">
        <Image
          src={`/assets/achievements/${achievement.id}.svg`}
          radius="lg"
          alt="Upgrade"
          h={125}
          w={125}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/assets/osaka.jpg"; // Fallback image
          }}
        />
        <Box style={{ textAlign: "left" }}>
          <Text
            fw="500"
            c="black"
            size="lg"
            style={{
              whiteSpace: "normal",
              wordBreak: "break-word",
              lineHeight: 1.5,
            }}
          >
            {achievement.name}
          </Text>
          <Box>
            <Text size="sm" c="dimmed">
              {achievement.description}
            </Text>
            {achievement.date ? (
              <Text size="sm" c="dimmed" mt="xs">
                Date achieved: {new Date(achievement.date).toLocaleDateString()}
              </Text>
            ) : null}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AchievementBox;
