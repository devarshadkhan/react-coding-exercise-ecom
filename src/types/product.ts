export type Category = "cameras" | "plan" | "sensors" | "accessories";

export interface Variant {
  variantId: string;
  label: string;
  swatchColor: string;
}

export interface Product {
  productId: string;
  category: Category;
  step: number;
  title: string;
  description: string;
  image: string;
  badge?: string;
  variants?: Variant[];
  price: number;
  compareAtPrice?: number;
  learnMoreUrl?: string;
}
