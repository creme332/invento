import { Title } from "@mantine/core";
import { useState, useEffect } from "react";
import CategoryTableSort from "../components/TableSort";
import { Category } from "../common/types";
import { appProps } from "../common/types";
import { ERROR } from "../common/utils";

export default function Categories({ backendURL, displayError }: appProps) {
  const [categories, setCategories] = useState<Category[]>([]);

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
      displayError(ERROR.SERVER_CONNECTION);
    }
  }

  async function deleteCategory(category: Category) {
    // ask for admin password
    const password = prompt("Enter admin password");
    if (!password || password.length < 3) {
      displayError("Invalid admin password");
      return;
    }

    try {
      const response = await fetch(
        `${backendURL}/category/${category._id}/delete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
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
      displayError(ERROR.SERVER_CONNECTION);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Title mb={20}>All categories ({categories.length})</Title>
      <CategoryTableSort
        deleteHandler={deleteCategory}
        data={categories}
        enableSearchBar={true}
      />
    </>
  );
}
