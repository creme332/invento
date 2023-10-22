import {
  Container,
  Grid,
  SimpleGrid,
  rem,
  Image,
  Text,
  Spoiler,
  Group,
  RingProgress,
  Badge,
  ActionIcon,
  useMantineTheme,
  Stack,
  Flex,
} from "@mantine/core";
import { useRouter } from "next/router";
import Link from "next/link";
const PRIMARY_COL_HEIGHT = rem(300);
import { IconPremiumRights, IconEdit, IconTrash } from "@tabler/icons-react";
import { getStatusBadgeColor } from "../../common/utils";
import { placeholderItem } from "../../common/utils";
import { Item, appProps } from "../../common/types";
import { useEffect, useState } from "react";

export default function ItemPage({ backendURL, displayError }: appProps) {
  const router = useRouter();
  const theme = useMantineTheme();
  const [item, setItem] = useState<Item>(placeholderItem);
  // Reference https://ui.mantine.dev/category/grids/#lead-grid
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const maxStock = 100 as number;
  const stockLevel: number = (100 * Math.min(item.stock, maxStock)) / maxStock;
  const imageURL = item.image
    ? item.image
    : `https://source.unsplash.com/random/600x400?${
        item.name
      }&${Math.random()}`;

  async function fetchItem() {
    if (!router.query.id) {
      displayError("Invalid URL: Item ID is missing.");
      return;
    }
    const id = router.query.id;
    console.log("Item id", id);
    try {
      const res = await fetch(`${backendURL}/item/${id}`);
      console.log(res);
      if (!res.ok) {
        displayError(res.statusText);
        return;
      }

      const item = await res.json();
      console.log(item);

      // get category of fetched item

      const categoryRes = await fetch(
        `${backendURL}/category/${item.category}`
      );

      if (!categoryRes.ok) {
        displayError(categoryRes.statusText);
        return;
      }

      const category = await categoryRes.json();
      item.category = category.name;
      setItem(item);
    } catch (error: any) {
      displayError(error.message);
    }
  }

  useEffect(() => {
    fetchItem();
  }, []);

  async function deleteItem() {
    try {
      const response = await fetch(`${backendURL}/item/${item._id}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);

      if (response.ok) {
        // redirect to items page
        router.push({
          pathname: "/items",
        });
      } else {
        displayError(response.statusText);
      }
    } catch (error) {
      displayError("Unable to connect to server. Please try again later.");
    }
  }

  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Image
          src={imageURL}
          alt="A random image"
          fallbackSrc="https://placehold.co/600x400?text=Image"
          height={PRIMARY_COL_HEIGHT}
          radius={"md"}
        />
        <Grid gutter="md">
          <Grid.Col>
            <Container p={0} h={SECONDARY_COL_HEIGHT}>
              <Flex justify={"space-between"}>
                <Group>
                  <Text fw={500} fz={40}>
                    {item.name}
                  </Text>
                  <Badge color={getStatusBadgeColor(item.status)}>
                    {item.status}
                  </Badge>
                </Group>
                <Link
                  style={{ justifySelf: "flex-end", alignSelf: "center" }}
                  href={{
                    pathname: "/edit/item",
                    query: { item: JSON.stringify(item) },
                  }}
                >
                  <ActionIcon variant="subtle" color="gray">
                    <IconEdit
                      style={{ width: rem(20), height: rem(20) }}
                      color={theme.colors.yellow[6]}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Link>
              </Flex>
              <Text c="dimmed">{item.category}</Text>
              <Spoiler
                style={{ zIndex: "999" }}
                maxHeight={30}
                showLabel="Show more"
                hideLabel="Hide"
              >
                {item.description}
              </Spoiler>{" "}
            </Container>
          </Grid.Col>
          <Grid.Col style={{ display: "grid", placeItems: "center" }} span={6}>
            <Group
              style={{ borderRadius: 10 }}
              p={20}
              bg={theme.colors.gray[9]}
            >
              <IconPremiumRights color="gold" size={50} />
              <Text fw={700} ta="center" size="xl">
                Rs {item.price}
              </Text>
            </Group>
          </Grid.Col>
          <Grid.Col style={{ display: "grid", placeItems: "center" }} span={6}>
            <Grid.Col span={6}>
              <RingProgress
                sections={[{ value: stockLevel, color: "blue" }]}
                label={
                  <Text c="blue" fw={700} ta="center" size="xl">
                    {stockLevel}%
                  </Text>
                }
              />
            </Grid.Col>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      <ActionIcon onClick={deleteItem} variant="subtle" color="gray">
        <IconTrash
          style={{ width: rem(20), height: rem(20) }}
          color={theme.colors.red[6]}
          stroke={1.5}
        />
      </ActionIcon>
    </Container>
  );
}
