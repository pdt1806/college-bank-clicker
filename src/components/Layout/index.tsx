import { AppShell, Box, ScrollArea } from "@mantine/core";
import { useMediaQuery, useOs } from "@mantine/hooks";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AchievementsEffect } from "../../GameProvider/AchievementsEffects";
import DiscordSDKComponent from "../../GameProvider/DiscordSDK";
import { GameEffects } from "../../GameProvider/GameEffects";
import { InventoryEffects } from "../../GameProvider/InventoryEffects";
import { PWAUpdateNotifier } from "../../GameProvider/PWAUpdateNoti";
import GlobalSounds from "../../GameProvider/SoundManager";
import { DiscordStore } from "../../GameProvider/Stores/DiscordStore";
import { SidebarsStore } from "../../GameProvider/Stores/SidebarsStore";
import { TOP_OFFSET, UNIFORMED_HEIGHT } from "../../utils/const";
import BottomNav from "../BottomNav";
import Navbar from "../Navbar";
import UpgradeBar from "../UpgradeBar";
import classes from "./index.module.css";

const Layout = () => {
  const asideOpened = SidebarsStore((state) => state.asideOpened);
  const navbarOpened = SidebarsStore((state) => state.navbarOpened);

  const { closeAside, closeNavbar } = SidebarsStore.getState();

  const location = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width: 75em)");

  const os = useOs();
  const isIOS = os === "ios";
  const adjustedHeight = isIOS ? "100%" : UNIFORMED_HEIGHT;

  const isInDiscord = DiscordStore((state) => state.isInDiscord);
  const isMinifiedInDiscord = useMediaQuery("(max-width: 330px)");
  const discordSmallScreen = isInDiscord && isMinifiedInDiscord;

  useEffect(() => {
    if (discordSmallScreen) {
      closeAside();
      closeNavbar();
      navigate({ to: "/", replace: true });
    }
  }, [discordSmallScreen]);

  return (
    <>
      <DiscordSDKComponent />
      <PWAUpdateNotifier />
      <GlobalSounds />
      <InventoryEffects />
      <GameEffects />
      <AchievementsEffect />
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
          collapsed: !isMobile || discordSmallScreen,
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
            <Navbar />
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
            <UpgradeBar />
          </ScrollArea.Autosize>
        </AppShell.Aside>

        <AppShell.Footer h={60}>
          <BottomNav />
        </AppShell.Footer>
      </AppShell>
    </>
  );
};

export default Layout;
