export interface Category {
  _id: string;
  name: string;
  description: string;
}

export interface NullableCategory {
  category?: Category;
}

export interface Item {
  _id: string;
  name: string;
  description: string;
  status: string;
  stock: number;
  image: string;
  price: number;
  category: string;
}

export interface appProps {
  backendURL: string;
  displayError(message: string): void;
}
