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
    },
    {
        id: 3,
        name: "Tote Bag Lavanda",
        slug: "tote-bag-lavanda",
        description: "Tote Bag confeccionada artesanalmente.",
        price: 26000,
        stock: 4,
        featured: true,
        category: categories[0],
        images: [
            {
                id: 3,
                url: "/images/products/tote-lavanda.webp",
                alt: "Tote Bag Lavanda",
                order: 1
            }
        ]
    },
    {
        id: 4,
        name: "Tote Bag Margarita",
        slug: "tote-bag-margarita",
        description: "Tote Bag confeccionada artesanalmente.",
        price: 24500,
        stock: 7,
        featured: false,
        category: categories[0],
        images: [
            {
                id: 4,
                url: "/images/products/tote-margarita.webp",
                alt: "Tote Bag Margarita",
                order: 1
            }
        ]
    },
    {
        id: 5,
        name: "Posavasos Tulipán",
        slug: "posavasos-tulipan",
        description: "Juego de posavasos confeccionados en tela.",
        price: 7500,
        stock: 8,
        featured: true,
        category: categories[1],
        images: [
            {
                id: 5,
                url: "/images/products/posavasos-tulipan.webp",
                alt: "Posavasos Tulipán",
                order: 1
            }
        ]
    },
    {
        id: 6,
        name: "Posavasos Lino",
        slug: "posavasos-lino",
        description: "Juego de posavasos confeccionados en tela.",
        price: 8500,
        stock: 12,
        featured: false,
        category: categories[1],
        images: [
            {
                id: 6,
                url: "/images/products/posavasos-lino.webp",
                alt: "Posavasos Lino",
                order: 1
            }
        ]
    },
    {
        id: 7,
        name: "Individual Campestre",
        slug: "individual-campestre",
        description: "Individual confeccionado artesanalmente.",
        price: 12000,
        stock: 6,
        featured: true,
        category: categories[2],
        images: [
            {
                id: 7,
                url: "/images/products/individual-campestre.webp",
                alt: "Individual Campestre",
                order: 1
            }
        ]
    },
    {
        id: 8,
        name: "Individual Floral",
        slug: "individual-floral",
        description: "Individual confeccionado artesanalmente.",
        price: 13000,
        stock: 9,
        featured: false,
        category: categories[2],
        images: [
            {
                id: 8,
                url: "/images/products/individual-floral.webp",
                alt: "Individual Floral",
                order: 1
            }
        ]
    },
    {
        id: 9,
        name: "Funda Primavera",
        slug: "funda-primavera",
        description: "Funda confeccionada artesanalmente.",
        price: 15000,
        stock: 5,
        featured: true,
        category: categories[3],
        images: [
            {
                id: 9,
                url: "/images/products/funda-primavera.webp",
                alt: "Funda Primavera",
                order: 1
            }
        ]
    },
    {
        id: 10,
        name: "Funda Jazmín",
        slug: "funda-jazmin",
        description: "Funda confeccionada artesanalmente.",
        price: 15500,
        stock: 3,
        featured: false,
        category: categories[3],
        images: [
            {
                id: 10,
                url: "/images/products/funda-jazmin.webp",
                alt: "Funda Jazmín",
                order: 1
            }
        ]
    },
    {
        id: 11,
        name: "Colita Magnolia",
        slug: "colita-magnolia",
        description: "Colita confeccionada artesanalmente.",
        price: 3500,
        stock: 20,
        featured: true,
        category: categories[4],
        images: [
            {
                id: 11,
                url: "/images/products/colita-magnolia.webp",
                alt: "Colita Magnolia",
                order: 1
            }
        ]
    },
    {
        id: 12,
        name: "Colita Lavanda",
        slug: "colita-lavanda",
        description: "Colita confeccionada artesanalmente.",
        price: 3200,
        stock: 15,
        featured: false,
        category: categories[4],
        images: [
            {
                id: 12,
                url: "/images/products/colita-lavanda.webp",
                alt: "Colita Lavanda",
                order: 1
            }
        ]
    },
    {
        id: 13,
        name: "Funda de Bidón Beige",
        slug: "funda-bidon-beige",
        description: "Funda confeccionada artesanalmente.",
        price: 18000,
        stock: 6,
        featured: true,
        category: categories[5],
        images: [
            {
                id: 13,
                url: "/images/products/funda-bidon-beige.webp",
                alt: "Funda de Bidón Beige",
                order: 1
            }
        ]
    },
    {
        id: 14,
        name: "Funda de Bidón Verde",
        slug: "funda-bidon-verde",
        description: "Funda confeccionada artesanalmente.",
        price: 19000,
        stock: 5,
        featured: false,
        category: categories[5],
        images: [
            {
                id: 14,
                url: "/images/products/funda-bidon-verde.webp",
                alt: "Funda de Bidón Verde",
                order: 1
            }
        ]
    },
    {
        id: 15,
        name: "Bufanda Siena",
        slug: "bufanda-siena",
        description: "Bufanda confeccionada artesanalmente.",
        price: 22000,
        stock: 4,
        featured: true,
        category: categories[6],
        images: [
            {
                id: 15,
                url: "/images/products/bufanda-siena.webp",
                alt: "Bufanda Siena",
                order: 1
            }
        ]
    },
    {
        id: 16,
        name: "Bufanda Aurora",
        slug: "bufanda-aurora",
        description: "Bufanda confeccionada artesanalmente.",
        price: 23000,
        stock: 5,
        featured: true,
        category: categories[6],
        images: [
            {
                id: 16,
                url: "/images/products/bufanda-aurora.webp",
                alt: "Bufanda Aurora",
                order: 1
            }
        ]
    },
    {
        id: 17,
        name: "Tote Bag Sol",
        slug: "tote-bag-sol",
        description: "Tote Bag confeccionada artesanalmente.",
        price: 25500,
        stock: 8,
        featured: false,
        category: categories[0],
        images: [
            {
                id: 17,
                url: "/images/products/tote-sol.webp",
                alt: "Tote Bag Sol",
                order: 1
            }
        ]
    },
    {
        id: 18,
        name: "Posavasos Gardenia",
        slug: "posavasos-gardenia",
        description: "Juego de posavasos confeccionados en tela.",
        price: 9000,
        stock: 7,
        featured: false,
        category: categories[1],
        images: [
            {
                id: 18,
                url: "/images/products/posavasos-gardenia.webp",
                alt: "Posavasos Gardenia",
                order: 1
            }
        ]
    },
    {
        id: 19,
        name: "Individual Lino",
        slug: "individual-lino",
        description: "Individual confeccionado artesanalmente.",
        price: 12500,
        stock: 6,
        featured: true,
        category: categories[2],
        images: [
            {
                id: 19,
                url: "/images/products/individual-lino.webp",
                alt: "Individual Lino",
                order: 1
            }
        ]
    },
    {
        id: 20,
        name: "Bufanda Invierno",
        slug: "bufanda-invierno",
        description: "Bufanda confeccionada artesanalmente.",
        price: 24000,
        stock: 3,
        featured: false,
        category: categories[6],
        images: [
            {
                id: 20,
                url: "/images/products/bufanda-invierno.webp",
                alt: "Bufanda Invierno",
                order: 1
            }
        ]
    }
];