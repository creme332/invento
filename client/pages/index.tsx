import { Group, Stack, Title } from "@mantine/core";
import HorizontalBarChart from "../components/charts/HorizontalBarChart";
import PieChart from "../components/charts/PieChart";
import { TableSort } from "../components/TableSort";
import { useEffect, useState } from "react";

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
      <Title>Your dashboard</Title>

      <Group h={300}>
        {barData ? (
          <HorizontalBarChart dataLabel="Count" labelsArray={barData[0]} dataArray={barData[1]} />
        ) : (
          <HorizontalBarChart />
        )}
        {pieData ? (
          <PieChart labelsArray={pieData[0]} dataArray={pieData[1]} />
        ) : (
          <PieChart />
        )}
      </Group>
      <Title order={3}>Recent items</Title>
      <TableSort />
    </Stack>
  );
}
