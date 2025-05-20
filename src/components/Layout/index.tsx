import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import MainGame from "../MainGame";
import Sidebar from "../Sidebar";

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      aside={{
        width: 400,
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
    >
      {/* <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <div>Logo</div>
      </AppShell.Header> */}

      <AppShell.Main>
        <MainGame toggleMenu={toggle} />
      </AppShell.Main>

      <AppShell.Aside withBorder={false}>
        <Sidebar toggleMenu={toggle} />
      </AppShell.Aside>
    </AppShell>
  );
};

export default Layout;
