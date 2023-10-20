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
}
