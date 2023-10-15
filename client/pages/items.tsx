import { useDisclosure } from "@mantine/hooks";
import { LoadingOverlay, Button, Group, Box } from "@mantine/core";

export default function Items() {
  const [visible, { toggle }] = useDisclosure(true);

  // Note that position: relative is required
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Group>Content here</Group>
        <Group>Content here</Group>
        <Group>Content here</Group>
        <Group>Content here</Group>
        <Group>Content here</Group>
      </Box>

      <Group>
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}
