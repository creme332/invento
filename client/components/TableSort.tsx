// Reference: https://ui.mantine.dev/category/tables/#table-sort
import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  Button,
  TextInput,
  rem,
  Flex,
  keys,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import classes from "../styles/TableSort.module.css";
import { Category } from "../common/types";
import Link from "next/link";

interface ThProps {
  children?: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort(): void;
}

interface tableProps {
  data: Category[];
  enableSearchBar?: Boolean;
  deleteHandler: (category: Category) => Promise<void>;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function filterData(data: Category[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: Category[],
  payload: { sortBy: keyof Category | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export default function CategoryTableSort({
  data,
  deleteHandler,
  enableSearchBar = false,
}: tableProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<Category[]>(data);
  const [sortBy, setSortBy] = useState<keyof Category | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Category) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  useEffect(() => {
    setSortedData(data);
    console.log(data);
  }, [data]);

  const rows = sortedData.map((row) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row._id}</Table.Td>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.description}</Table.Td>
      <Table.Td>
        <Flex justify={"space-between"}>
          <Link
            href={{
              pathname: "/edit/category",
              query: {
                title: "Edit category",
                category: JSON.stringify(row),
              },
            }}
          >
            <Button color="grey">Edit</Button>
          </Link>
          <Button onClick={() => deleteHandler(row)} color="red">
            Delete
          </Button>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));
  rows.push(
    <Table.Tr key={"fdsfdsfds"}>
      <Table.Td colSpan={4}>
        <Link
          style={{ textDecoration: "none" }}
          href={{
            pathname: "/edit/category",
            query: {
              title: "Create new category",
            },
          }}
        >
          <Button fullWidth variant="light">
            {"+ New category"}
          </Button>
        </Link>
      </Table.Td>
    </Table.Tr>
  );

  return (
    <ScrollArea>
      {enableSearchBar ? (
        <TextInput
          placeholder="Search by any field"
          mb="xl"
          leftSection={
            <IconSearch
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
          value={search}
          onChange={handleSearchChange}
        />
      ) : null}

      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "_id"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("_id")}
            >
              ID
            </Th>
            <Th
              sorted={sortBy === "name"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("name")}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === "description"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("description")}
            >
              Description
            </Th>
            <Th onSort={() => {}}>Actions</Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Text fw={500} ta="center">
                  {"Nothing found"}
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
