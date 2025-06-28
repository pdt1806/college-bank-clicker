import { AppShell, Box, ScrollArea } from "@mantine/core";
import { useMediaQuery, useOs } from "@mantine/hooks";
import { Outlet, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { GameEffects } from "../../GameProvider/GameEffects";
import { useGlobalSounds } from "../../GameProvider/SoundManager";
import { SidebarsStore } from "../../GameProvider/Stores/SidebarsStore";
import { TOP_OFFSET, UNIFORMED_HEIGHT } from "../../utils/const";
import BottomNav from "../BottomNav";
import Navbar from "../Navbar";
import UpgradeBar from "../UpgradeBar";
import classes from "./index.module.css";

const Layout = () => {
  const { toggleAside, closeAside, toggleNavbar, closeNavbar } = SidebarsStore.getState();
  const asideOpened = SidebarsStore(useShallow((state) => state.asideOpened));
  const navbarOpened = SidebarsStore(useShallow((state) => state.navbarOpened));

  const location = useLocation();

  const isMobile = useMediaQuery("(max-width: 75em)");
  const os = useOs();

  const isIOS = os === "ios";
  const adjustedHeight = isIOS ? "100%" : UNIFORMED_HEIGHT;

  useGlobalSounds(); // Initialize global sounds

  useEffect(() => {
    sessionStorage.setItem("asideOpened", asideOpened.toString());
    sessionStorage.setItem("navbarOpened", navbarOpened.toString());
  }, [asideOpened, navbarOpened]);

  return (
    <>
      <GameEffects />
      <AppShell
        aside={{
          width: 400,
          breakpoint: "lg",
          collapsed: {
            mobile: !asideOpened,
            desktop: location.pathname !== "/",
          },
        }}
        navbar={{
          width: 300,
          breakpoint: "lg",
          collapsed: { mobile: !navbarOpened },
        }}
        footer={{
          height: 60,
          collapsed: !isMobile,
        }}
        bg="cbc-purple.9"
        pt={TOP_OFFSET}
        h="100vh"
      >
        <Box className={classes.background}></Box>
        <AppShell.Navbar withBorder={false} className={classes.sidebarWrapper}>
          <ScrollArea.Autosize
            scrollbarSize={8}
            h={isMobile ? adjustedHeight : "100%"}
            className={classes.sidebar + " " + classes.navBar}
            pt={TOP_OFFSET}
          >
            <Navbar navbarOpened={navbarOpened} toggleNavbar={toggleNavbar} />
          </ScrollArea.Autosize>
        </AppShell.Navbar>

        <AppShell.Main className={classes.main}>
          <Outlet />
        </AppShell.Main>

        <AppShell.Aside withBorder={false} className={classes.sidebarWrapper}>
          <ScrollArea.Autosize
            scrollbarSize={8}
            h={isMobile ? adjustedHeight : "100%"}
            className={classes.sidebar + " " + classes.upgradeBar}
            pt={TOP_OFFSET}
          >
            <UpgradeBar asideOpened={asideOpened} />
          </ScrollArea.Autosize>
        </AppShell.Aside>

        <AppShell.Footer h={60}>
          <BottomNav
            toggleAside={toggleAside}
            toggleNavbar={toggleNavbar}
            closeAside={closeAside}
            closeNavbar={closeNavbar}
          />
        </AppShell.Footer>
      </AppShell>
    </>
  );
};

export default Layout;
