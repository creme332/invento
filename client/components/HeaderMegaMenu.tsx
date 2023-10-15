import {
  Group,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../styles/HeaderMegaMenu.module.css";

export default function HeaderMegaMenu() {
  const links = [
    { text: "Home", href: "/" },
    { text: "Items", href: "/items" },
    { text: "Categories", href: "/categories" },
  ];
  const linkComponents = links.map((e) => (
    <a href={e.href} key={`tab-link-${e.text}`} className={classes.link}>
      {e.text}
    </a>
  ));
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box pb={50}>
      <header className={classes.header}>
        <Group className={classes.group}>
          <Group h="100%" gap={0} visibleFrom="sm">
            {linkComponents}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      {/** Define drawer for mobile */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          {linkComponents}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
