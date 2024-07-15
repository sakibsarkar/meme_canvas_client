export interface IProductCategory {
  _id: string;
  label: string;
  value: string;
  image: string;
  count?: number;
}

export interface IReviews {
  _id: string;
  text: string;
  rating: number;
}

// src/types/Product.ts
export interface IProduct {
  _id?: string;
  name: string;
  photo: string;
  category: string;
  description: string;
  stock: number;
  price: number;
  discountPrice: number;
  brand: string;
  reviews: IReviews[];
  cell?: string;
  service?: Record<string, unknown>;
  averageRating?: number;
  tag: string | "";
}
