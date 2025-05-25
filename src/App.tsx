import { Center, createTheme, MantineProvider, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import { createMemoryRouter, RouteObject, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import MainGame from "./components/MainGame";
import { GameProvider } from "./GameProvider";
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
      // {
      //   path: "*",
      //   element: <Navigate to="/" replace />,
      // },
      {
        path: "*",
        element: (
          <Center h="100%" w="100%">
            <Text c="white" p="md">
              to be developed soon (trust me bro) - benny
            </Text>
          </Center>
        ),
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
        <RouterProvider router={router} />
      </MantineProvider>
    </GameProvider>
  );
}
