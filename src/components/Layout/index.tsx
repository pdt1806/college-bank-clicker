import { AppShell } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../BottomNav";
import Navbar from "../Navbar";
import UpgradeBar from "../UpgradeBar";
import classes from "./index.module.css";

const Layout = () => {
  const [asideOpened, { toggle: toggleAside, close: closeAside }] = useDisclosure();
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar }] = useDisclosure();

  const location = useLocation();

  const bottomNavCollapse = useMediaQuery("(min-width: 75em)");

  return (
    <AppShell
      aside={{
        width: 400,
        breakpoint: "lg",
        collapsed: { mobile: !asideOpened || location.pathname !== "/", desktop: location.pathname !== "/" },
      }}
      navbar={{
        width: 300,
        breakpoint: "lg",
        collapsed: { mobile: !navbarOpened },
      }}
      footer={{
        height: 60,
        collapsed: bottomNavCollapse,
      }}
      bg="cbc-purple.9"
    >
      <AppShell.Navbar withBorder={false} className={classes.navbar} w={{ base: "100%", lg: 300 }}>
        <Navbar navbarOpened toggleNavbar={toggleNavbar} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Aside withBorder={false} className={classes.aside}>
        <UpgradeBar />
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
