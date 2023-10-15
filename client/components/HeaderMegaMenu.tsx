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
    { text: "Home", href: "#" },
    { text: "Items", href: "#" },
    { text: "Categories", href: "#" },
  ];
  const linkComponents = links.map((e) => (
    <a href={e.href} className={classes.link}>
      {e.text}
    </a>
  ));
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  return (
    <Box pb={120}>
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
