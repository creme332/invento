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

interface cardProps {
  item: Item;
}
export default function ArticleCardFooter({ item }: cardProps) {
  // Reference: https://ui.mantine.dev/category/article-cards/#article-card-footer
  const theme = useMantineTheme();

  function getStatusBadgeColor(status: string): string {
    switch (status) {
      case "Available":
        return "green";
      case "Maintenance":
        return "orange";
      case "Loaned":
        return "pink";
      case "Reserved":
        return "violet";
      default:
        return "violet";
    }
  }

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src={`https://source.unsplash.com/random/?${
            item.name
          }&${Math.random()}`}
          alt="A random image"
          fallbackSrc="https://placehold.co/600x400"
          height={180}
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
          style={{ textDecoration: "none", color:"var(--mantine-color-gray-4)" }}
          href={`/item/${encodeURIComponent(item._id)}`}
        >
          {" "}
          {item.name}
        </Link>
      </Text>

      <Text c="dimmed" fz="xs" truncate="end">
        {item.description}
      </Text>

      {/* <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <Link
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

          <Link href={`/item/${encodeURIComponent(item._id)}`}>
            <ActionIcon variant="subtle" color="gray">
              <IconExternalLink
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.green[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Link>

          <Link href={`/`}>
            <ActionIcon variant="subtle" color="gray">
              <IconTrash
                style={{ width: rem(20), height: rem(20) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </ActionIcon>
          </Link>
        </Group>
      </Card.Section> */}
    </Card>
  );
}
