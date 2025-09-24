export type Category = string;

export interface Dress {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  sizes: string[];
}
