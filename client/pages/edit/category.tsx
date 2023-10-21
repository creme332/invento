import {
  TextInput,
  Button,
  Group,
  Box,
  Loader,
  Alert,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";

interface props {
  backendURL: string;
}

export default function CategoryForm({ backendURL }: props) {
  const router = useRouter();
  const initialCategory = router.query.category
    ? router.query.category
    : {
        name: "",
        description: "",
      };
  const [serverError, setServerError] = useState("");
  const form = useForm({
    initialValues: initialCategory,

    validate: {
      name: (value: string) =>
        value.length < 3 ? "Name must have at least 3 characters" : null,
      description: (value: string) =>
        value.length < 3 ? "Description must have at least 3 characters" : null,
    },
  });

  async function sendPostRequest(e: SyntheticEvent) {
    setServerError("");
    e.preventDefault(); // prevent form from reloading on submission
    console.log("Form values: ", form.values);

    // validate form and display any errors to user
    form.validate();

    // if form has no errors, send request
    if (form.isValid()) {
      try {
        const response = await fetch(`${backendURL}/category/create`, {
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
          console.log(response.statusText);
          setServerError(response.statusText);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  }

  return (
    <Box maw={340} mx="auto">
      <Title>{router.query.title ? router.query.title : ""}</Title>
      <form method="POST" onSubmit={sendPostRequest}>
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
        {serverError.length > 0 ? (
          <Alert color="red">{serverError}</Alert>
        ) : null}
      </form>
    </Box>
  );
}
