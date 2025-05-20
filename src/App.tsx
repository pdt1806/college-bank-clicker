import { createTheme, MantineColorsTuple, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "./components/Layout";
import { GameProvider } from "./GameProvider";

const brown: MantineColorsTuple = [
  "#f7f3f2",
  "#e8e6e5",
  "#d2c9c6",
  "#bdaaa4",
  "#ab9087",
  "#a17f74",
  "#9d766a",
  "#896459",
  "#7b594e",
  "#5d4037",
];

export const theme = createTheme({
  fontFamily: "Host Grotesk, sans-serif",
  headings: { fontFamily: "Host Grotesk, sans-serif" },
  colors: {
    brown,
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
