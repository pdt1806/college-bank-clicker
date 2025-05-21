export const automaticUpgradeList: AutomaticUpgrade[] = [
  {
    id: "upgrade-physics",
    name: "Lower AP Physics Pass Rate",
    icon: "cbs-physics.svg",
    cost: 10,
    costFactor: 1.1,
    perSecond: 0.1,
    description:
      "The class with the lowest overall pass rate of any AP exam is getting worse...",
  },
  {
    id: "upgrade-ap-spanish",
    name: "Make AP Spanish Language Audio Quieter",
    icon: "icon2.png",
    cost: 20,
    costFactor: 1.2,
    perSecond: 0.3,
    description:
      "Because who needs to hear the audio clearly during the exam? Not you.",
  },
  {
    id: "upgrade-ap-comp-sci-a",
    name: "Cut Exam Time for AP Computer Science A",
    icon: "icon3.png",
    cost: 50,
    costFactor: 1.3,
    perSecond: 0.6,
    description:
      "Less time to code, more time to panic. The exam just got shorter.",
  },
  {
    id: "upgrade-ap-bio",
    name: "Make AP Biology Exam Date Sooner",
    icon: "icon4.png",
    cost: 100,
    costFactor: 1.4,
    perSecond: 2.0,

    description: "Surprise! The AP Bio exam is now even earlier in the year.",
  },
  {
    id: "upgrade-ap-us-history",
    name: "Add More Content to AP U.S. History",
    icon: "icon5.png",
    cost: 200,
    costFactor: 1.6,
    perSecond: 2.5,
    description:
      "Because 500 years of history wasn't enough, here's more to memorize.",
  },
  {
    id: "upgrade-ap-precalc",
    name: "Ban College Credit for AP Precalculus",
    icon: "icon6.png",
    cost: 500,
    costFactor: 1.8,
    perSecond: 3.0,
    description: "No more college credit for AP Precalculus. Sorry, students.",
  },
  {
    id: "upgrade-steal-other-peoples-work",
    name: "Steal Other People's Work",
    icon: "icon7.png",
    cost: 1000,
    costFactor: 2.0,
    perSecond: 5.0,
    description:
      "Why do the work yourself when you can just take someone else's?",
  },
];

export const manualUpgradeList: ManualUpgrade[] = [
  {
    id: "upgrade-pencil",
    name: "2B Pencil Only",
    icon: "cbs-pencil-01.svg",
    cost: 100,
    perClick: 2,
    description:
      "The only pencil allowed on the exam is a 2B pencil. No other pencils are allowed.",
  },
];
