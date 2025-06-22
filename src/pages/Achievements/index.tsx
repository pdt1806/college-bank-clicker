import { Box, Container, ScrollArea, SimpleGrid, Tabs, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconArrowUp, IconMoneybag, IconMouse } from "@tabler/icons-react";
import AchievementBox from "../../components/AchievementBox";
import { useGame } from "../../GameProvider";
import { clickAchievementList, moneyAchievementList, upgradeAchievementList } from "../../utils/achievements";
import { audio } from "../../utils/audio";
import { UNIFORMED_HEIGHT } from "../../utils/const";
import classes from "./index.module.css";

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

  const { achievements, playSound } = useGame();

  const generateContent = (tab: AchievementsTab) => {
    const sortedAchievementsWithDate = tab.list
      .map((achievement) => {
        const achievedDate = achievements[achievement.id];
        return {
          ...achievement,
          date: achievedDate ?? null,
        };
      })
      .sort((a, b) => {
        if (a.date && b.date) return new Date(a.date).getTime() - new Date(b.date).getTime();
        else if (a.date && !b.date) return -1;
        else if (!a.date && b.date) return 1;
        else return 0;
      });
    return sortedAchievementsWithDate.map((achievement) => {
      return <AchievementBox achievement={achievement} key={achievement.id} />;
    });
  };

  return (
    <Container size="xl" py="xs" c="white" h={isMobile ? UNIFORMED_HEIGHT : "100vh"}>
      <Title py="lg">Achievements</Title>
      <Tabs
        variant="default"
        color="cbc-purple"
        radius="md"
        defaultValue="Money"
        my="lg"
        styles={{ panel: { height: `calc(100% - 60px)`, padding: 0 } }}
        style={{ height: `calc(100% - 60px)`, marginBlock: 0, margin: 0 }}
      >
        <ScrollArea w="100%" scrollbarSize={0}>
          <Tabs.List style={{ flexWrap: "nowrap" }} className={classes.tabList}>
            {tabs.map((tab) => (
              <Tabs.Tab
                key={tab.name}
                value={tab.name}
                leftSection={<tab.icon size={24} />}
                className={classes.tab}
                onClick={() => playSound(audio.pop3)}
              >
                <Text>{tab.name}</Text>
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </ScrollArea>

        {tabs.map((tab) => (
          <Tabs.Panel id={tab.name} key={tab.name} value={tab.name}>
            <ScrollArea.Autosize scrollbarSize={8} h="100%">
              <Box pt="sm" pb="xl">
                <Text mb="md">
                  {tab.list.filter((achievement) => Object.keys(achievements).includes(achievement.id)).length} /{" "}
                  {tab.list.length} achievements of this category earned
                </Text>
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing={"md"}>
                  {generateContent(tab)}
                </SimpleGrid>
              </Box>
            </ScrollArea.Autosize>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Container>
  );
};

export default Achievements;
