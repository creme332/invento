import { Group, Stack, Title } from "@mantine/core";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import PieChart from "../components/charts/PieChart";
import { TableSort } from "../components/TableSort";

export default function IndexPage() {
  return (
    <Stack>
      <Title>Your dashboard</Title>

      <Group h={300}>
        <HorizontalBarChart />
        <PieChart />
      </Group>
      <Title order={3}>Recent items</Title>
      <TableSort />
    </Stack>
  );
}
