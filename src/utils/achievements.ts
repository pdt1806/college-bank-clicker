export const moneyAchievementList: Achievement[] = [
  {
    id: "achievement-money-one-hundred",
    name: "Pocket Change",
    description: "You earned your first 100 dollars. Congratulations!",
    icon: "",
    value: 100,
  },
  {
    id: "achievement-money-one-thousand",
    name: "Piggy Bank Filler",
    description: "You earned your first 1,000 dollars. Impressive!",
    icon: "",
    value: 1000,
  },
  {
    id: "achievement-money-one-hundred-thousand",
    name: "Couch Cushion Tycoon",
    description: "You earned your first 100,000 dollars. Amazing!",
    icon: "",
    value: 100000,
  },
  {
    id: "achievement-money-one-million",
    name: "Millionaire's Club",
    description: "You earned your first 1,000,000 dollars. Incredible!",
    icon: "",
    value: 1000000,
  },
  {
    id: "achievement-money-one-hundred-million",
    name: "Fortune Foundry",
    description: "You earned your first 100,000,000 dollars. Unbelievable!",
    icon: "",
    value: 100000000,
  },
  {
    id: "achievement-money-one-billion",
    name: "Billionaire Brainiac",
    description: "You earned your first 1,000,000,000 dollars. Legendary!",
    icon: "",
    value: 1000000000,
  },
];

export const clickAchievementList: Achievement[] = [
  {
    id: "achievement-click-ten",
    name: "Finger Tapper",
    description: "You clicked 10 times. Keep it up!",
    icon: "",
    value: 10,
  },
  {
    id: "achievement-click-one-hundred",
    name: "Button Masher",
    description: "You clicked 100 times. You're on a roll!",
    icon: "",
    value: 100,
  },
  {
    id: "achievement-click-one-thousand",
    name: "Click Commander",
    description: "You clicked 1,000 times. Impressive dedication!",
    icon: "",
    value: 1000,
  },
  {
    id: "achievement-click-ten-thousand",
    name: "Mouse Maestro",
    description: "You clicked 10,000 times. You're unstoppable!",
    icon: "",
    value: 10000,
  },
  {
    id: "achievement-click-one-hundred-thousand",
    name: "Digital Dynamo",
    description: "You clicked 100,000 times. Legendary effort!",
    icon: "",
    value: 100000,
  },
  {
    id: "achievement-click-one-million",
    name: "Clickpocalypse",
    description: "You clicked 1,000,000 times. A true champion!",
    icon: "",
    value: 1000000,
  },
];

export const totalUpgradeAchievementList: Achievement[] = [
  {
    id: "achievement-upgrade-first",
    name: "Upgrade Rookie",
    description: "You purchased your first upgrade. Keep upgrading!",
    icon: "",
    value: 1,
  },
  {
    id: "achievement-upgrade-five",
    name: "Enhancement Enthusiast",
    description: "You purchased 5 upgrades. You're getting stronger!",
    icon: "",
    value: 5,
  },
  {
    id: "achievement-upgrade-ten",
    name: "Boost Baron",
    description: "You purchased 10 upgrades. Impressive progress!",
    icon: "",
    value: 10,
  },
  {
    id: "achievement-upgrade-twenty-five",
    name: "Powerhouse Pro",
    description: "You purchased 25 upgrades. You're unstoppable!",
    icon: "",
    value: 25,
  },
  {
    id: "achievement-upgrade-fifty",
    name: "Upgrade Overlord",
    description: "You purchased 50 upgrades. Legendary dedication!",
    icon: "",
    value: 50,
  },
  {
    id: "achievement-upgrade-one-hundred",
    name: "Ascension Architect",
    description: "You purchased 100 upgrades. A true master!",
    icon: "",
    value: 100,
  },
];

export const categoryUpgradeAchievementList: Achievement[] = [
  {
    id: "achievement-upgrade-automation",
    name: "Automation Aficionado",
    description: "You purchased all automation upgrades. Embrace the future!",
    icon: "",
  },
  {
    id: "achievement-upgrade-manual",
    name: "Click Connoisseur",
    description: "You purchased all manual upgrades. Click like a pro!",
    icon: "",
  },
];

export const upgradeAchievementList: Achievement[] = [
  ...totalUpgradeAchievementList,
  ...categoryUpgradeAchievementList,
];

export const allAchievements: Achievement[] = [
  ...moneyAchievementList,
  ...clickAchievementList,
  ...totalUpgradeAchievementList,
  ...categoryUpgradeAchievementList,
];
