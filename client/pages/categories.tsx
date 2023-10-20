import { Button, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CategoryTableSort from "../components/TableSort";

interface categoriesProps {
  backendURL: string;
}

export default function Categories({ backendURL }: categoriesProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any | null>(null);

  async function fetchCategories() {
    try {
      const res = await fetch(`${backendURL}/categories`);
      const jsonObj = await res.json();
      console.log(jsonObj);
      setCategories(jsonObj);
    } catch (error) {
      console.log(error);
    }
  }

  function redirectToCategoryForm() {
    router.push({
      pathname: "/edit/category",
      query: {
        title: "Create new category",
      },
    });
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Title mb={20}>All categories</Title>
      {categories ? (
        <CategoryTableSort data={categories} enableSearchBar={true} />
      ) : null}
      <Button onClick={redirectToCategoryForm}>Create category</Button>
    </>
  );
}
