import { Button, Title, Grid, Group, Container, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import { ArticleCardFooter } from "../components/ArticleCardFooter";
export default function Items() {
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
    <Container style={{ outline: "1px solid red" }}>
      <Title mb={20}>All items(10)</Title>
      <Grid
        grow
        gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}
        style={{ outline: "1px solid blue" }}
      >
        <Grid.Col span={4}>
          <Flex direction={"column"} gap={"lg"}>
            <ArticleCardFooter />
            <ArticleCardFooter />
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          {" "}
          <Flex direction={"column"} gap={"lg"}>
            <ArticleCardFooter />
            <ArticleCardFooter />
          </Flex>
        </Grid.Col>
        <Grid.Col span={4}>
          {" "}
          <Flex direction={"column"} gap={"lg"}>
            <ArticleCardFooter />
          </Flex>{" "}
        </Grid.Col>
      </Grid>
    </Container>
  );
}
