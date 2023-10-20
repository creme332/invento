import { TextInput, Checkbox, Button, Group, Box, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";

export default function CategoryForm() {
  const form = useForm({
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const router = useRouter();

  return (
    <Box maw={340} mx="auto">
      <Title>
        {router.query.title ? router.query.title : "Create new item"}
      </Title>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
