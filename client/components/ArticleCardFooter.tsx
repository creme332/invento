// Reference: https://ui.mantine.dev/category/article-cards/#article-card-footer
import {
  Card,
  Image,
  Group,
  Text,
  Badge,
  useMantineTheme,
} from "@mantine/core";
import classes from "../styles/ArticleCardFooter.module.css";
import { Item } from "../common/types";
import Link from "next/link";
import { getStatusBadgeColor } from "../common/utils";

interface cardProps {
  item: Item;
}

export default function ArticleCardFooter({ item }: cardProps) {
  const theme = useMantineTheme();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src={`https://source.unsplash.com/random/?${
            item.name
          }&${Math.random()}`}
          alt="A random image"
          fallbackSrc="https://placehold.co/600x400"
          height={100}
        />
      </Card.Section>

      <Group>
        <Badge
          w="fit-content"
          color={getStatusBadgeColor(item.status)}
          variant="light"
        >
          {item.status}
        </Badge>
        <Badge w="fit-content" variant="light">
          {item.category}
        </Badge>
      </Group>
      <Text fw={700} className={classes.title} mt="xs">
        <Link
          style={{
            textDecoration: "none",
            color: "var(--mantine-color-gray-4)",
          }}
          href={{
            pathname: `/item/${item._id}`,
            query: { id: item._id },
          }}
        >
          {" "}
          {item.name}
        </Link>
      </Text>

      <Text c="dimmed" fz="xs" truncate="end">
        {item.description}
      </Text>
    </Card>
  );
}
