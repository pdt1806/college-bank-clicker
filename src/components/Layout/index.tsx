import { AppShell, Box, ScrollArea } from "@mantine/core";
import { useDisclosure, useMediaQuery, useOs } from "@mantine/hooks";
import { Outlet, useLocation } from "react-router-dom";
import { TOP_OFFSET, UNIFORMED_HEIGHT } from "../../utils/const";
import BottomNav from "../BottomNav";
import Navbar from "../Navbar";
import UpgradeBar from "../UpgradeBar";
import classes from "./index.module.css";

const Layout = () => {
  const [asideOpened, { toggle: toggleAside, close: closeAside }] = useDisclosure();
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure();

  const location = useLocation();

  const isMobile = useMediaQuery("(max-width: 75em)");
  const os = useOs();

  const isIOS = os === "ios";
  const adjustedHeight = isIOS ? "100%" : UNIFORMED_HEIGHT;

  return (
    <AppShell
      aside={{
        width: 400,
        breakpoint: "lg",
        collapsed: { mobile: !asideOpened, desktop: location.pathname !== "/" },
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
          bg="cbc-bluegray.8"
          className={classes.sidebar}
          pt={TOP_OFFSET}
        >
          <Navbar navbarOpened toggleNavbar={toggleNavbar} />
        </ScrollArea.Autosize>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>
        <Outlet />
      </AppShell.Main>

      <AppShell.Aside withBorder={false} className={classes.sidebarWrapper}>
        <ScrollArea.Autosize
          scrollbarSize={8}
          h={isMobile ? adjustedHeight : "100%"}
          bg="cbc-bluegray.8"
          className={classes.sidebar}
          pt={TOP_OFFSET}
        >
          <UpgradeBar />
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
  );
};

export default Layout;
