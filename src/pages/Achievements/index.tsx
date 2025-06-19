import { Box, Container, ScrollArea, SimpleGrid, Tabs, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowUp, IconMoneybag, IconMouse } from "@tabler/icons-react";
import AchievementBox from "../../components/AchievementBox";
import { useGame } from "../../GameProvider";
import { clickAchievementList, moneyAchievementList, upgradeAchievementList } from "../../utils/achievements";

const tabs = [
  {
    name: "Money",
    icon: IconMoneybag,
    list: moneyAchievementList,
  },
  {
    name: "Clicks",
    icon: IconMouse,
    list: clickAchievementList,
  },
  {
    name: "Upgrades",
    icon: IconArrowUp,
    list: upgradeAchievementList,
  },
];

const Achievements = () => {
  const isMobile = useMediaQuery("(max-width: 75em)");

  const { achievements } = useGame();

  const generateContent = (tab: AchievementsTab) => {
    return tab.list.map((achievement) => {
      // Check if the achievement is in the user's achievements
      const achieved = achievements.find((a) => a.id === achievement.id);
      return (
        <Box style={{ opacity: achieved ? 1 : 0.5 }} key={achievement.id}>
          <AchievementBox achievement={achieved ?? achievement} />
        </Box>
      );
    });
  };

  return (
    <Container size="xl" py="xs" c="white" h={isMobile ? "calc(100vh - 60px - env(safe-area-inset-top))" : "100vh"}>
      <Title py="lg">Achievements</Title>
      <Tabs
        variant="outline"
        radius="md"
        defaultValue="Money"
        my="lg"
        styles={{ panel: { height: "calc(100% - 60px)" } }}
        style={{ height: "calc(100% - 60px)", marginBlock: 0, margin: 0 }}
      >
        <ScrollArea w="100%">
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.name} value={tab.name} leftSection={<tab.icon size={24} />}>
                <Text>{tab.name}</Text>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </ScrollArea>

        {tabs.map((tab) => (
          <Tabs.Panel id={tab.name} key={tab.name} value={tab.name} py="xs">
            <ScrollArea.Autosize h="100%">
              <Text mb="md">
                {achievements.filter((a) => tab.list.some((t) => t.id === a.id)).length} / {tab.list.length}{" "}
                achievements of this category earned
              </Text>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={"md"}>
                {generateContent(tab)}
              </SimpleGrid>
            </ScrollArea.Autosize>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  );
};

export default Achievements;
