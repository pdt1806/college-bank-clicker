export const moneyAchievementList: Achievement[] = [
  {
    id: "achievement-money-one-hundred",
    name: "First 100 Dollars Earned",
    description: "You earned your first 100 dollars. Congratulations!",
    icon: "",
    value: 100,
  },
  {
    id: "achievement-money-one-thousand",
    name: "First 1,000 Dollars Earned",
    description: "You earned your first 1,000 dollars. Impressive!",
    icon: "",
    value: 1000,
  },
  {
    id: "achievement-money-one-hundred-thousand",
    name: "First 100,000 Dollars Earned",
    description: "You earned your first 100,000 dollars. Amazing!",
    icon: "",
    value: 100000,
  },
  {
    id: "achievement-money-one-million",
    name: "First 1,000,000 Dollars Earned",
    description: "You earned your first 1,000,000 dollars. Incredible!",
    icon: "",
    value: 1000000,
  },
  {
    id: "achievement-money-one-hundred-million",
    name: "First 100,000,000 Dollars Earned",
    description: "You earned your first 100,000,000 dollars. Unbelievable!",
    icon: "",
    value: 100000000,
  },
  {
    id: "achievement-money-one-billion",
    name: "First 1,000,000,000 Dollars Earned",
    description: "You earned your first 1,000,000,000 dollars. Legendary!",
    icon: "",
    value: 1000000000,
  },
];

export const clickAchievementList: Achievement[] = [
  {
    id: "achievement-click-ten",
    name: "First 10 Clicks",
    description: "You clicked 10 times. Keep it up!",
    icon: "",
    value: 10,
  },
  {
    id: "achievement-click-one-hundred",
    name: "First 100 Clicks",
    description: "You clicked 100 times. You're on a roll!",
    icon: "",
    value: 100,
  },
  {
    id: "achievement-click-one-thousand",
    name: "First 1,000 Clicks",
    description: "You clicked 1,000 times. Impressive dedication!",
    icon: "",
    value: 1000,
  },
  {
    id: "achievement-click-ten-thousand",
    name: "First 10,000 Clicks",
    description: "You clicked 10,000 times. You're unstoppable!",
    icon: "",
    value: 10000,
  },
  {
    id: "achievement-click-one-hundred-thousand",
    name: "First 100,000 Clicks",
    description: "You clicked 100,000 times. Legendary effort!",
    icon: "",
    value: 100000,
  },
  {
    id: "achievement-click-one-million",
    name: "First 1,000,000 Clicks",
    description: "You clicked 1,000,000 times. A true champion!",
    icon: "",
    value: 1000000,
  },
];

export const upgradeAchievementList: Achievement[] = [
  {
    id: "achievement-upgrade-first",
    name: "First Upgrade Purchased",
    description: "You purchased your first upgrade. Keep upgrading!",
    icon: "",
    value: 1,
  },
  {
    id: "achievement-upgrade-five",
    name: "Five Upgrades Purchased",
    description: "You purchased five upgrades. You're getting stronger!",
    icon: "",
    value: 5,
  },
  {
    id: "achievement-upgrade-ten",
    name: "Ten Upgrades Purchased",
    description: "You purchased ten upgrades. Impressive progress!",
    icon: "",
    value: 10,
  },
  {
    id: "achievement-upgrade-twenty-five",
    name: "Twenty-Five Upgrades Purchased",
    description: "You purchased twenty-five upgrades. You're unstoppable!",
    icon: "",
    value: 25,
  },
  {
    id: "achievement-upgrade-fifty",
    name: "Fifty Upgrades Purchased",
    description: "You purchased fifty upgrades. Legendary dedication!",
    icon: "",
    value: 50,
  },
  {
    id: "achievement-upgrade-one-hundred",
    name: "One Hundred Upgrades Purchased",
    description: "You purchased one hundred upgrades. A true master!",
    icon: "",
    value: 100,
  },
];

export const allAchievements: Achievement[] = [
  ...moneyAchievementList,
  ...clickAchievementList,
  ...upgradeAchievementList,
];
