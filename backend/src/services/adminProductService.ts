import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

export async function getAdminProducts() {
    return prisma.product.findMany({
        include: {
            category: true,
            fabric: true,
            images: {
                orderBy: {
                    order: "asc",
                },
            },
        },
        orderBy: {
            id: "asc",
        },
    });
}

interface CreateAdminProductInput {
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    featured: boolean;
    embroidery: boolean;
    categoryId: number;
    fabricId: number;
    images: {
        url: string;
        alt?: string;
        order: number;
    }[];
}

export async function createAdminProduct(
    data: CreateAdminProductInput
) {
    const category =
        await prisma.category.findUnique({
            where: {
                id: data.categoryId,
            },
        });

    if (!category) {
        throw new Error(
            "La categoría seleccionada no existe"
        );
    }

    const fabric =
        await prisma.fabric.findUnique({
            where: {
                id: data.fabricId,
            },
        });

    if (!fabric) {
        throw new Error(
            "La tela seleccionada no existe"
        );
    }

    const existingProduct =
        await prisma.product.findUnique({
            where: {
                slug: data.slug,
            },
        });

    if (existingProduct) {
        throw new Error(
            "Ya existe un producto con ese slug"
        );
    }

    if (data.price < 0) {
        throw new Error(
            "El precio no puede ser negativo"
        );
    }

    if (data.stock < -1) {
        throw new Error(
            "El stock debe ser -1 o mayor"
        );
    }

    return prisma.product.create({
        data: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            stock: data.stock,
            featured: data.featured,
            embroidery: data.embroidery,

            categoryId: data.categoryId,
            fabricId: data.fabricId,

            images: {
                create: data.images.map(
                    (image) => ({
                        url: image.url,
                        alt: image.alt ?? "",
                        order: image.order,
                    })
                ),
            },
        },

        include: {
            category: true,
            fabric: true,
            images: {
                orderBy: {
                    order: "asc",
                },
            },
        },
    });
}

export async function getAdminCategories() {
    return prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

export async function getAdminFabrics() {
    return prisma.fabric.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

interface UpdateAdminProductInput {
    name: string;
    slug: string;
    description: string;
    price: number;
    stock: number;
    featured: boolean;
    embroidery: boolean;
    categoryId: number;
    fabricId: number;
}

export async function updateAdminProduct(
    id: number,
    data: UpdateAdminProductInput
) {
    const product =
        await prisma.product.findUnique({
            where: {
                id,
            },
        });

    if (!product) {
        throw new Error(
            "El producto no existe"
        );
    }

    const category =
        await prisma.category.findUnique({
            where: {
                id: data.categoryId,
            },
        });

    if (!category) {
        throw new Error(
            "La categoría seleccionada no existe"
        );
    }

    const fabric =
        await prisma.fabric.findUnique({
            where: {
                id: data.fabricId,
            },
        });

    if (!fabric) {
        throw new Error(
            "La tela seleccionada no existe"
        );
    }

    const existingProduct =
        await prisma.product.findFirst({
            where: {
                slug: data.slug,
                NOT: {
                    id,
                },
            },
        });

    if (existingProduct) {
        throw new Error(
            "Ya existe otro producto con ese slug"
        );
    }

    if (data.price < 0) {
        throw new Error(
            "El precio no puede ser negativo"
        );
    }

    if (data.stock < -1) {
        throw new Error(
            "El stock debe ser -1 o mayor"
        );
    }

    return prisma.product.update({
        where: {
            id,
        },

        data: {
            name: data.name,
            slug: data.slug,
            description: data.description,
            price: data.price,
            stock: data.stock,
            featured: data.featured,
            embroidery: data.embroidery,
            categoryId: data.categoryId,
            fabricId: data.fabricId,
        },

        include: {
            category: true,
            fabric: true,
            images: {
                orderBy: {
                    order: "asc",
                },
            },
        },
    });
}

export async function getAdminProduct(
    id: number
) {
    const product =
        await prisma.product.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
                fabric: true,
                images: {
                    orderBy: {
                        order: "asc",
                    },
                },
            },
        });

    if (!product) {
        throw new Error(
            "El producto no existe"
        );
    }

    return product;
}