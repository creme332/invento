import { TextInput, Button, Group, Box, Loader, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

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

  const form = useForm({
    initialValues: initialCategory,

    validate: {
      name: (value: string) =>
        value.length < 3 ? "Name must have at least 3 characters" : null,
      description: (value: string) =>
        value.length < 3 ? "Description must have at least 3 characters" : null,
    },
  });

  async function sendPostRequest() {
    console.log(form.values);
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
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box maw={340} mx="auto">
      <Title>{router.query.title ? router.query.title : ""}</Title>
      <form>
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
          <Button onClick={sendPostRequest}>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
