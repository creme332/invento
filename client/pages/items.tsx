import { Title, Grid, Stack, Flex } from "@mantine/core";
import ArticleCardFooter from "../components/ArticleCardFooter";
import EmptyCard from "../components/EmptyCard";
import { appProps } from "../common/types";
import { useState, useEffect } from "react";
import { Item } from "../common/types";
import { ERROR } from "../common/utils";

export default function Items({
  backendURL,
  displayError,
  toggleLoader,
}: appProps) {
  const [items, setItems] = useState<Item[]>([]);

  async function fetchItems() {
    toggleLoader(true);
    try {
      const res = await fetch(`${backendURL}/items`);
      if (!res.ok) {
        displayError(res.statusText);
      } else {
        const jsonObj = await res.json();
        console.log(jsonObj);
        setItems(jsonObj);
      }
      toggleLoader(false);
    } catch (err) {
      displayError(ERROR.SERVER_CONNECTION);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function getItemComponents() {
    // Items are placed in a grid with 3 columns
    // Determine which item goes into which column
    const columns: number[][] = [[], [], []];

    for (let i = 0; i < items.length; i++) {
      columns[i % 3].push(i);
    }
    const columnSize = 3;
    // TODO: Refactor code below
    return (
      <Grid grow gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
        <Grid.Col span={columnSize}>
          <Flex direction={"column"} gap={"lg"}>
            {columns[0].map((i) => (
              <ArticleCardFooter key={`card-col0-${i}`} item={items[i]} />
            ))}
            {items.length % 3 == 0 ? <EmptyCard /> : null}
          </Flex>
        </Grid.Col>

        <Grid.Col span={columnSize}>
          <Flex direction={"column"} gap={"lg"}>
            {" "}
            {columns[1].map((i) => (
              <ArticleCardFooter key={`card-col1-${i}`} item={items[i]} />
            ))}
            {items.length % 3 == 1 ? <EmptyCard /> : null}
          </Flex>
        </Grid.Col>

        <Grid.Col span={columnSize}>
          <Flex direction={"column"} gap={"lg"}>
            {" "}
            {columns[2].map((i) => (
              <ArticleCardFooter key={`card-col2-${i}`} item={items[i]} />
            ))}
            {items.length % 3 == 2 ? <EmptyCard /> : null}
          </Flex>
        </Grid.Col>
      </Grid>
    );
  }

  return (
    <Stack>
      <Title mb={20}>All items ({items.length})</Title>
      {getItemComponents()}
    </Stack>
  );
}
