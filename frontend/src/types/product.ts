import type { Category } from "./category";
import type { ProductImage } from "./product-image";
import type { Fabric } from "./fabric";

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    featured: boolean;

    category: Category;
    fabric: Fabric;
    embroidery: boolean;

    images: ProductImage[];
}