import { Button, Title } from "@mantine/core";
import { TableSort } from "../components/TableSort";
export default function Categories() {
  return (
    <>
      <Title mb={20}>All categories</Title>
      <TableSort enableSearchBar={true} />
      <Button>Create category</Button>
    </>
  );
}
