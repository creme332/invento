import { TextInput, Button, Group, Box, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";

interface props {
  backendURL: string;
  displayError(message: string): void;
}

export default function CategoryForm({ backendURL, displayError }: props) {
  const router = useRouter();
  const editMode = router.query.category ? true : false; // if category has been specified, edit mode  = true

  // Determine values to be set in form.
  const initialCategory = {
    name: editMode ? JSON.parse(router.query.category as string).name : "",
    description: editMode
      ? JSON.parse(router.query.category as string).description
      : "",
  };

  const form = useForm({
    initialValues: initialCategory,

    validate: {
      name: (value: string) =>
        value.length < 3 ? "Name must have at least 3 characters" : null,
      description: (value: string) =>
        value.length < 3 ? "Description must have at least 3 characters" : null,
    },
  });

  async function submitCategory(e: SyntheticEvent) {
    const createURL = `${backendURL}/category/create`;
    const editURL = router.query.category
      ? `${backendURL}/category/${
          JSON.parse(router.query.category as string)._id
        }/update`
      : "";

    e.preventDefault(); // prevent form from reloading on submission
    console.log("Form values: ", form.values);

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
          body: JSON.stringify(form.values),
        });
        console.log(response);
        if (response.ok) {
          router.push({
            pathname: "/categories",
          });
        } else {
          displayError(response.statusText);
        }
      } catch (error: any) {
        displayError("Unable to connect to server. Please try again later.");
      }
    }
  }

  return (
    <Box maw={340} mx="auto">
      <Title>{router.query.title ? router.query.title : ""}</Title>
      <form method="POST" onSubmit={submitCategory}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Science"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Description"
          placeholder="Cool stuffs"
          {...form.getInputProps("description")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
