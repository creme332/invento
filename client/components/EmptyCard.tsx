import { Card, Text } from "@mantine/core";
import classes from "../styles/EmptyCard.module.css";
import { useRouter } from "next/router";

export default function EmptyCard() {
  const router = useRouter();

  function redirectToItemForm() {
    router.push({
      pathname: "/edit/item",
      query: {
        title: "Create new item",
      },
    });
  }

  return (
    <Card
      onClick={redirectToItemForm}
      withBorder
      style={{ display: "grid", placeItems: "center", height: "355px" }}
      padding="lg"
      radius="md"
      className={classes.card}
    >
      <Text c={"dimmed"} fw={600}>
        + New item
      </Text>
    </Card>
  );
}
