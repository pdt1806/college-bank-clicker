import {
  createTheme,
  MantineColorsTuple,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "./components/Layout";
import { GameProvider } from "./GameProvider";

const brown: MantineColorsTuple = [
  "#faf4ef",
  "#f0e6df",
  "#e2cab9",
  "#d6ad90",
  "#cb946c",
  "#c58456",
  "#c27b49",
  "#ab693b",
  "#995d32",
  "#3d2412",
];

const cbs: MantineColorsTuple = [
  "#2F2542", // 0 - Money-Making-Simulator-1-hex
  "#485C73", // 1 - Money-Making-Simulator-2-hex
  "#B5C7CC", // 2 - Money-Making-Simulator-3-hex
  "#FFFFFF", // 3 - Money-Making-Simulator-4-hex (adjusted)
  "#D3DB79", // 4 - Money-Making-Simulator-5-hex (adjusted)
  "#68A367", // 5 - Money-Making-Simulator-6-hex (adjusted)
  "#347F80", // 6 - Money-Making-Simulator-7-hex (adjusted)
  "#CC682F", // 7 - filler
  "#CC682F", // 8 - filler
  "#CC682F", // 9 - filler
];

export const theme = createTheme({
  fontFamily: "Host Grotesk, sans-serif",
  headings: { fontFamily: "Host Grotesk, sans-serif" },
  colors: {
    brown,
    cbs,
  },
});

export default function App() {
  return (
    <GameProvider>
      <MantineProvider theme={theme}>
        <Layout />
      </MantineProvider>
    </GameProvider>
  );
}
