import {
  TextInput,
  Button,
  Group,
  Box,
  Title,
  NumberInput,
  NativeSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { Item, appProps, Category, ItemStatus } from "../../common/types";
import { useEffect, useState, SyntheticEvent } from "react";
import { ERROR } from "../../common/utils";

export default function ItemForm({ backendURL, displayError }: appProps) {
  const router = useRouter();
  const editMode = router.query.item ? true : false; // if item has been specified, edit mode  = true
  const [categories, setCategories] = useState<Category[]>([]);
  const validStatus = ["Available", "Maintenance", "Loaned", "Reserved"];

  function getInitialItem() {
    if (editMode) {
      // edit item mode
      return JSON.parse(router.query.item as string);
    }

    // create item mode
    const initialItem: Item = {
      _id: "",
      name: "",
      description: "",
      status: "Available",
      stock: 0,
      image: "",
      price: 0,
      category: "",
    };

    return initialItem;
  }

  function getCategoryNames() {
    return categories.map((e: Category) => e.name);
  }

  const form = useForm({
    initialValues: getInitialItem(),

    validate: {
      name: (value: string) => {
        if (value.length < 3) return "Name must have at least 3 characters";
        if (value.length > 100) return "Name must have at most 100 characters";
        return null;
      },
      description: (value: string) => {
        if (value.length < 3)
          return "Description must have at least 3 characters";
        if (value.length > 100)
          return "Description must have at most 100 characters";
        return null;
      },
      stock: (value: number) =>
        value < 0 ? "Stock must be a non-negative number" : null,
      price: (value: number) =>
        value < 0 ? "Price must be a non-negative number" : null,
      category: (value: string) =>
        getCategoryNames().includes(value) ? null : `Invalid category`,
      status: (value: ItemStatus) =>
        validStatus.includes(value)
          ? null
          : `Invalid status. Valid status: ${validStatus.join()}`,
    },

    transformValues: (values) => {
      // replace category name with category id
      if (editMode) {
        return {
          _id: values._id,
          name: values.name,
          description: values.description,
          stock: values.stock,
          price: values.price,
          status: values.status,
          category: getCategoryID(values.category),
        };
      }

      // if new item is created, do not include item id
      return {
        name: values.name,
        description: values.description,
        stock: values.stock,
        price: values.price,
        status: values.status,
        category: getCategoryID(values.category),
      };
    },
  });

  function getCategoryID(categoryName: string) {
    const matches = categories.filter((e) => e.name == categoryName);
    if (matches.length > 0) return matches[0]._id;
    return "";
  }

  async function fetchCategories() {
    try {
      const res = await fetch(`${backendURL}/categories`);
      if (!res.ok) {
        displayError(res.statusText);
      } else {
        const jsonObj = await res.json();
        console.log("Fetched categories", jsonObj);
        setCategories(jsonObj);
        return jsonObj;
      }
    } catch (err) {
      displayError(ERROR.SERVER_CONNECTION);
      return [];
    }
  }

  async function onLoad() {
    const latestCategories = await fetchCategories(); //! value of categories variable may not be up-to-date
    const size = latestCategories.length;

    // Check if categories list is empty: output error
    if (size == 0) {
      displayError(ERROR.EMPTY_CATEGORY_LIST);
      return;
    }

    form.setFieldValue("category", latestCategories[0].name);
  }

  useEffect(() => {
    onLoad();
  }, []);

  async function submitItem(e: SyntheticEvent) {
    const createURL = `${backendURL}/item/create`;
    const editURL = editMode
      ? `${backendURL}/item/${
          JSON.parse(router.query.item as string)._id
        }/update`
      : "";

    e.preventDefault(); // prevent form from reloading on submission
    console.log("Form values: ", form.values);
    const x = form.getTransformedValues();
    console.log("Form transformed values: ", form.getTransformedValues());
    const finalFormValues = form.getTransformedValues();
    // validate form and display any errors to user
    form.validate();

    // if form has no errors, send request
    if (form.isValid()) {
      try {
        const response = await fetch(editMode ? editURL : createURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalFormValues),
        });
        console.log(response);
        if (response.ok) {
          router.push({
            pathname: "/items",
          });
        } else {
          displayError(response.statusText);
        }
      } catch (error: any) {
        displayError(ERROR.SERVER_CONNECTION);
      }
    }
  }

  return (
    <Box maw={340} mx="auto">
      <Title>{editMode ? "Edit item" : "Create new item"}</Title>
      <form onSubmit={submitItem}>
        <TextInput withAsterisk label="name" {...form.getInputProps("name")} />
        <TextInput
          withAsterisk
          label="description"
          {...form.getInputProps("description")}
        />
        <NumberInput min={0} label="price" {...form.getInputProps("price")} />
        <NumberInput min={0} label="stock" {...form.getInputProps("stock")} />
        <NativeSelect
          label="category"
          withAsterisk
          data={getCategoryNames()}
          {...form.getInputProps("category")}
        />
        <NativeSelect
          withAsterisk
          label="status"
          data={validStatus}
          {...form.getInputProps("status")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
