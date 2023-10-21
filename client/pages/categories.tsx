import { Title } from "@mantine/core";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import CategoryTableSort from "../components/TableSort";
import { Category } from "../common/types";

interface categoriesProps {
  backendURL: string;
  displayError(message: string): void;
}

export default function Categories({
  backendURL,
  displayError,
}: categoriesProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any | null>(null);

  async function fetchCategories() {
    try {
      const res = await fetch(`${backendURL}/categories`);
      if (!res.ok) {
        displayError(res.statusText);
      } else {
        const jsonObj = await res.json();
        console.log(jsonObj);
        setCategories(jsonObj);
      }
    } catch (err) {
      displayError("Unable to connect to server. Please try again later.");
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
        // if request succeeded, fetch new list of categories
        fetchCategories();
      } else {
        displayError(response.statusText);
      }
    } catch (error) {
      displayError("Unable to connect to server. Please try again later.");
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
