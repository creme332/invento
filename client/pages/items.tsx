import { Title, Grid, Container, Flex } from "@mantine/core";
import ArticleCardFooter from "../components/ArticleCardFooter";
import EmptyCard from "../components/EmptyCard";

export default function Items() {
  return (
    <Container>
      <Title mb={20}>All items</Title>
      <Grid grow gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
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
            <EmptyCard />
          </Flex>{" "}
        </Grid.Col>
      </Grid>
    </Container>
  );
}
