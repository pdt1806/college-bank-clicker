import { Center, createTheme, MantineProvider, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import MainGame from "./components/MainGame";
import { GameProvider } from "./GameProvider";

export const theme = createTheme({
  fontFamily: "Host Grotesk, sans-serif",
  headings: { fontFamily: "Host Grotesk, sans-serif" },
  colors: {
    "cbc-purple": [
      "#f4f2f8",
      "#e4e1e9",
      "#c8c0d5",
      "#aa9dc0",
      "#9080ae",
      "#806da4",
      "#7963a0",
      "#67538c",
      "#5c497d",
      "#2f2542",
    ],
    "cbc-bluegray": [
      "#f2f5f7",
      "#e6e6e7",
      "#c7ccd1",
      "#a7b0bb",
      "#8b98a7",
      "#79899c",
      "#6f8198",
      "#5e6f84",
      "#526377",
      "#485c73",
    ],
    "cbc-bluegreen": [
      "#e6fafc",
      "#dceef0",
      "#bed9dc",
      "#90bbc0",
      "#81b0b5",
      "#6ea4ab",
      "#629fa6",
      "#508b91",
      "#427c82",
      "#2c6c73",
    ],
    "cbc-white": [
      "#ffffff",
      "#e7e7e7",
      "#cdcdcd",
      "#b2b2b2",
      "#9a9a9a",
      "#8b8b8b",
      "#848484",
      "#717171",
      "#656565",
      "#575757",
    ],
    "cbc-yellow": [
      "#fafce6",
      "#f3f5d6",
      "#e5eaaf",
      "#d3db79",
      "#cbd462",
      "#c3ce4b",
      "#bfcb3d",
      "#a8b32e",
      "#959f25",
      "#7f8916",
    ],
    "cbc-green": [
      "#edfaec",
      "#dfeedf",
      "#c1dac0",
      "#9fc59f",
      "#83b382",
      "#71a870",
      "#68a367",
      "#568e55",
      "#4a7e49",
      "#3b6d3c",
    ],
    "cbc-teal": [
      "#f0f9f9",
      "#e4efef",
      "#c3dfe0",
      "#9fcfcf",
      "#83c1c2",
      "#70b8b9",
      "#65b4b5",
      "#539e9f",
      "#468d8e",
      "#347f80",
    ],
  },
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

const router = createBrowserRouter(routes);

export default function App() {
  return (
    <GameProvider>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </GameProvider>
  );
}
