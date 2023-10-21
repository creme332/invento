import {
  Group,
  Stack,
  Title,
  Card,
  Text,
  rem,
  Avatar,
} from "@mantine/core";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import PieChart from "../components/charts/PieChart";
import { useEffect, useState } from "react";
import {
  IconBoxSeam,
  IconCategory,
  IconTruckDelivery,
  IconUsers,
} from "@tabler/icons-react";

interface homepageProps {
  backendURL: string;
}

export default function Homepage({ backendURL }: homepageProps) {
  const [items, setItems] = useState([]);
  const [barData, setBarData] = useState<any | null>(null);
  const [pieData, setPieData] = useState<any | null>(null); //https://stackoverflow.com/a/65240675/17627866

  async function fetchDataAt(pathname: string) {
    try {
      const res = await fetch(backendURL + pathname);
      const jsonObj = await res.json();
      return jsonObj;
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  async function fetchAllData() {
    try {
      // fetch data as dictionaries
      const fetchedItems = await fetchDataAt("/items");
      const itemsByCategory = await fetchDataAt("/items/grouped-by-category");
      const itemsByStatus = await fetchDataAt("/items/grouped-by-status");
      // console.log(itemsByCategory, itemsByStatus);

      setItems(fetchedItems);

      setPieData([
        itemsByStatus.map((e: any) => e.status),
        itemsByStatus.map((e: any) => e.totalItems),
      ]);

      setBarData([
        itemsByCategory.map((e: any) => e.category),
        itemsByCategory.map((e: any) => e.totalItems),
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <Stack>
      <Title>Dashboard</Title>

      <Group justify="space-between">
        <Card
          style={{ flex: "1" }}
          h={340}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          {barData ? (
            <HorizontalBarChart
              dataLabel="Count"
              labelsArray={barData[0]}
              dataArray={barData[1]}
            />
          ) : (
            <HorizontalBarChart />
          )}
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          {pieData ? (
            <PieChart labelsArray={pieData[0]} dataArray={pieData[1]} />
          ) : (
            <PieChart />
          )}
        </Card>
      </Group>
      <Group
        style={{ height: "300px" }}
        // justify="space-between"
        gap={20}
      >
        <Card
          style={{ flex: 1, height: "100%" }}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Text fw={600} size="sm">
            Insights
          </Text>
          <Group mt="lg">
            <IconBoxSeam
              style={{ width: rem(30), height: rem(30), color: "#FF66B2" }}
              stroke={1.5}
            />
            <Text fz={"sm"}>Total items: 10</Text>
          </Group>
          <Group mt="lg">
            <IconCategory
              style={{ width: rem(30), height: rem(30), color: "#FFB266" }}
              stroke={1.5}
            />{" "}
            <Text fz={"sm"}>Total categories: 10</Text>
          </Group>
          <Group mt="lg">
            <IconUsers
              style={{ width: rem(30), height: rem(30), color: "#66FF99" }}
              stroke={1.5}
            />{" "}
            <Text fz={"sm"}>Workers available: 10 </Text>
          </Group>
          <Group mt="lg">
            <IconTruckDelivery
              style={{ width: rem(30), height: rem(30), color: "#66B2FF" }}
              stroke={1.5}
            />{" "}
            <Text fz={"sm"}>Lorries available: 3 </Text>
          </Group>
        </Card>

        <Card
          style={{ flex: 1, height: "100%" }}
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
        >
          <Text fw={600} size="sm">
            Latest items
          </Text>

          <Group mt="lg">
            <Avatar radius="sm" />
            <div>
              <Text fw={500}>Item 1</Text>
              <Text fz="xs" c="dimmed">
                created 34 minutes ago
              </Text>
            </div>
          </Group>
          <Group mt="lg">
            <Avatar radius="sm" />
            <div>
              <Text fw={500}>Item 1</Text>
              <Text fz="xs" c="dimmed">
                posted 34 minutes ago
              </Text>
            </div>
          </Group>
          <Group mt="lg">
            <Avatar radius="sm" />
            <div>
              <Text fw={500}>Item 1</Text>
              <Text fz="xs" c="dimmed">
                posted 34 minutes ago
              </Text>
            </div>
          </Group>
        </Card>
      </Group>
    </Stack>
  );
}
