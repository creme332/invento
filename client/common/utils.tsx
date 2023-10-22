import { Item, ItemStatus } from "./types";

export function getStatusBadgeColor(status: ItemStatus): string {
  switch (status) {
    case "Available":
      return "green";
    case "Maintenance":
      return "orange";
    case "Loaned":
      return "pink";
    case "Reserved":
      return "violet";
    default:
      return "violet";
  }
}

export const placeholderItem: Item = {
  _id: "",
  name: "Item name",
  description:
    "This is a sample description that contains many alphanumeric characters.",
  status: "Available",
  stock: 0,
  image:"https://placehold.co/600x400?text=Image",
  price: 0,
  category: "",
};
