import {
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconTrash, IconEdit, IconExternalLink } from "@tabler/icons-react";
import classes from "../styles/ArticleCardFooter.module.css";

export function ArticleCardFooter() {
  // Reference: https://ui.mantine.dev/category/article-cards/#article-card-footer
  const theme = useMantineTheme();

  return (
    <Card withBorder padding="lg" radius="md" className={classes.card}>
      <Card.Section mb="sm">
        <Image
          src="https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
          alt="Top 50 underrated plants for house decoration"
          height={180}
        />
      </Card.Section>

      <Badge w="fit-content" variant="light">
        decorations
      </Badge>

      <Text fw={700} className={classes.title} mt="xs">
        Top 50 underrated plants for house decoration
      </Text>
      <Text c="dimmed" fz="xs">
        Short item description
      </Text>

      <Card.Section className={classes.footer}>
        <Group justify="space-between">
          <ActionIcon variant="subtle" color="gray">
            <IconEdit
              style={{ width: rem(20), height: rem(20) }}
              color={theme.colors.yellow[6]}
              stroke={1.5}
            />
          </ActionIcon>

          <ActionIcon variant="subtle" color="gray">
            <IconExternalLink
              style={{ width: rem(20), height: rem(20) }}
              color={theme.colors.green[6]}
              stroke={1.5}
            />
          </ActionIcon>

          <ActionIcon variant="subtle" color="gray">
            <IconTrash
              style={{ width: rem(20), height: rem(20) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Card.Section>
    </Card>
  );
}
