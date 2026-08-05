import type { Category } from "./category";
import type { ProductImage } from "./product-image";

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    featured: boolean;

    category: Category;

    images: ProductImage[];
}