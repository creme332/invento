import { Button, Title } from "@mantine/core";
import { TableSort } from "../components/TableSort";

export default function Items() {
  return (
    <>
      <Title mb={20}>All items</Title>
      <TableSort enableSearchBar={true} />
      <Button>Create item</Button>
    </>
  );
}
