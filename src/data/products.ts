import type { Product } from "../types";
import { categories } from "./categories";

export const products: Product[] = [
    {
        id: 1,
        name: "Tote Bag Magnolia",
        slug: "tote-bag-magnolia",
        description: "Tote Bag confeccionada artesanalmente.",
        price: 25000,
        stock: 5,
        featured: true,
        category: categories[0],
        images: [
            {
                id: 1,
                url: "/images/products/tote-magnolia.webp",
                alt: "Tote Bag Magnolia",
                order: 1
            }
        ]
    },
    {
        id: 2,
        name: "Posavasos Flores",
        slug: "posavasos-flores",
        description: "Juego de posavasos confeccionados en tela.",
        price: 8000,
        stock: 10,
        featured: true,
        category: categories[1],
        images: [
            {
                id: 2,
                url: "/images/products/posavasos-flores.webp",
                alt: "Posavasos Flores",
                order: 1
            }
        ]
    }
];