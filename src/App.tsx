import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Layout from "./components/Layout";
import { GameProvider } from "./GameProvider";

export const theme = createTheme({});

export default function App() {
  return (
    <GameProvider>
      <MantineProvider theme={theme}>
        <Layout />
      </MantineProvider>
    </GameProvider>
  );
}
