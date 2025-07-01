import { createRootRoute, createRoute } from "@tanstack/react-router";
import Layout from "../components/Layout";
import About from "../pages/About";
import Achievements from "../pages/Achievements";
import { Inventory } from "../pages/Inventory";
import MainGame from "../pages/MainGame";
import Settings from "../pages/Settings";
import Statistics from "../pages/Statistics";

const rootRoute = createRootRoute({
  component: Layout,
});

const mainRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainGame,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: Settings,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const achievementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/achievements",
  component: Achievements,
});

const statisticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/statistics",
  component: Statistics,
});

const inventoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/inventory",
  component: Inventory,
});

export const routeTree = rootRoute.addChildren([
  mainRoute,
  settingsRoute,
  aboutRoute,
  achievementsRoute,
  statisticsRoute,
  inventoryRoute,
]);
