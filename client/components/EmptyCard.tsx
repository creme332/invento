import { Card, Text } from "@mantine/core";
import classes from "../styles/EmptyCard.module.css";
import Link from "next/link";

export default function EmptyCard() {
  return (
    <Link
      style={{ textDecoration: "none", color: "var(--mantine-color-gray-4)" }}
      href={{
        pathname: "/edit/item",
        query: {
          title: "Create new item",
        },
      }}
    >
      <Card
        withBorder
        padding="lg"
        radius="md"
        className={classes.card}
      >
        <Text c={"dimmed"} fw={600}>
          + New item
        </Text>
      </Card>
    </Link>
  );
}
