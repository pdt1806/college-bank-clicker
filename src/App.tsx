import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { createMemoryRouter, RouteObject, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { GameProvider } from "./GameProvider";
import About from "./pages/About";
import Achievements from "./pages/Achievements";
import MainGame from "./pages/MainGame";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import { colors } from "./utils/colors";

export const theme = createTheme({
  fontFamily: "Host Grotesk, sans-serif",
  headings: { fontFamily: "Host Grotesk, sans-serif" },
  colors: colors,
});

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainGame />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "achievements",
        element: <Achievements />,
      },
      {
        path: "statistics",
        element: <Statistics />,
      },
    ],
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
});

export default function App() {
  return (
    <GameProvider>
      <MantineProvider theme={theme}>
        <Notifications />
        <RouterProvider router={router} />
      </MantineProvider>
    </GameProvider>
  );
}
