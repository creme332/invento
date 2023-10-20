import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CategoryTableSort from "../components/TableSort";
import { Category } from "../common/types";

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

  function editCategory(initialCategory: Category, isNew: Boolean) {
    if (isNew) {
      router.push({
        pathname: "/edit/category",
        query: {
          title: "Create new category",
        },
      });
    } else {
      router.push({
        pathname: "/edit/category",
        query: {
          title: "Edit category",
          category: JSON.stringify(initialCategory),
        },
      });
    }
  }

  async function deleteCategory(category: Category) {
    try {
      const response = await fetch(
        `${backendURL}/category/${category._id}/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Title mb={20}>All categories</Title>
      {categories ? (
        <CategoryTableSort
          editHandler={editCategory}
          deleteHandler={deleteCategory}
          data={categories}
          enableSearchBar={true}
        />
      ) : null}
    </>
  );
}
