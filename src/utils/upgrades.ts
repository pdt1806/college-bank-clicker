import { AutomaticUpgrade, ManualUpgrade, Upgrade } from "./types";

export const automaticUpgradeList: AutomaticUpgrade[] = [
  {
    id: "upgrade-ap-psychology",
    name: "Crash the Server during AP Psychology Exam",
    cost: 10, // from index 0
    costMultiplier: 1.1,
    perSecond: 0.1,
    description: "A psychological experiment gone wrong. The server crashes during the exam.",
  },
  {
    id: "upgrade-ap-spanish",
    name: "Make AP Spanish Language Audio Quieter",
    cost: 20, // from index 1
    costMultiplier: 1.2,
    perSecond: 0.2,
    description: "Because who needs to hear the audio clearly during the exam? Not you.",
  },
  {
    id: "upgrade-ap-precalc",
    name: "Ban College Credit for AP Precalculus",
    cost: 50, // from index 2
    costMultiplier: 1.2,
    perSecond: 0.5,
    description: "No more college credit for AP Precalculus. Sorry, students.",
  },
  {
    id: "upgrade-ap-comp-sci-a",
    name: "Cut Exam Time for AP Computer Science A",
    cost: 100, // from index 3
    costMultiplier: 1.2,
    perSecond: 1.0,
    description: "Less time to code, more time to panic. The exam just got shorter.",
  },
  {
    id: "upgrade-ap-bio",
    name: "Make AP Biology Exam Date Sooner",
    cost: 200, // from index 4
    costMultiplier: 1.3,
    perSecond: 1.2,
    description: "Surprise! The AP Bio exam is now even earlier in the year.",
  },
  {
    id: "upgrade-ap-us-history",
    name: "Add More Content to AP U.S. History",
    cost: 500, // from index 5
    costMultiplier: 1.3,
    perSecond: 1.5,
    description: "Because 500 years of history wasn't enough, here's more to memorize.",
  },
  {
    id: "upgrade-ap-physics-1",
    name: "Lower AP Physics 1 Pass Rate",
    cost: 1000, // from index 6
    costMultiplier: 1.3,
    perSecond: 2.0,
    description: "The class with the lowest overall pass rate of any AP exam is getting worse...",
  },
  {
    id: "upgrade-ap-chemistry",
    name: "Add More Labs in AP Chemistry",
    cost: 2000,
    costMultiplier: 1.4,
    perSecond: 2.2,
    description: "Get ready to spend hours on end in the lab.",
  },
  {
    id: "upgrade-ap-calculus-bc",
    name: "More 'Series' Questions in AP Calculus BC",
    cost: 5000,
    costMultiplier: 1.4,
    perSecond: 2.5,
    description: "Because who doesn't love series convergence tests? Get ready for more of those.",
  },
  {
    id: "upgrade-ap-lang-lit",
    name: "Same College Credit for AP English Lang. & Lit.",
    cost: 10000,
    costMultiplier: 1.5,
    perSecond: 3.0,
    description: "Do double the work for the same credit. AP Lang and Lit are now the same in terms of college credit.",
  },
];

export const manualUpgradeList: ManualUpgrade[] = [
  {
    id: "upgrade-pencil",
    name: "2B Pencil Only",
    cost: 200,
    costMultiplier: 1.2,
    perClick: 2,
    description: "The only pencil allowed on the exam is a 2B pencil. No other pencils are allowed.",
  },
  {
    id: "upgrade-fully-digital",
    name: "Fully Digital AP Exams",
    cost: 800,
    costMultiplier: 1.3,
    perClick: 3,
    description: "All AP exams are now fully digital. No more paper exams.",
  },
  {
    id: "upgrade-increase-cancellation-fee",
    name: "Increase AP Exam Cancellation Fee",
    cost: 1500,
    costMultiplier: 1.3,
    perClick: 5,
    description: "How dare you cancel your AP exam? Pay a hefty fee for that.",
  },
  {
    id: "upgrade-automatic-grading",
    name: "Automatic Grading for AP Exams",
    cost: 2000,
    costMultiplier: 1.3,
    perClick: 7,
    description:
      "All AP exams are now automatically graded. No more waiting until July for scores. (not really, we just added this for fun)",
  },
  {
    id: "upgrade-no-desmos",
    name: "No Desmos on AP Exams",
    cost: 3000,
    costMultiplier: 1.4,
    perClick: 10,
    description: "Desmos is no longer allowed on AP exams. Time to buy an expensive graphing calculator.",
  },
];

export const allUpgrades: Upgrade[] = [...automaticUpgradeList, ...manualUpgradeList];
