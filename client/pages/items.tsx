import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay, Button, Group, Box, Title } from "@mantine/core";
import { TableSort } from "../components/TableSort";

export default function Items() {
  const [visible, { toggle }] = useDisclosure(false);

  // Note that position: relative is required
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Title mb={20}>All items</Title>

        <TableSort enableSearchBar={true} />
        <Button>Create item</Button>
      </Box>

      <Group>
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
