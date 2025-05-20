import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MainGame from "../MainGame";
import Sidebar from "../Sidebar";
import classes from "./index.module.css";

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      aside={{
        width: 400,
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      bg="cbs.0"
    >
      {/* <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header> */}

      <AppShell.Main>
        <MainGame toggleMenu={toggle} />
      </AppShell.Main>

      <AppShell.Aside withBorder={false} className={classes.aside}>
        <Sidebar toggleMenu={toggle} />
      </AppShell.Aside>
    </AppShell>
  );
};

export default Layout;
