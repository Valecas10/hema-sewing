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

interface CreateAdminCategoryInput {
    name: string;
    slug: string;
    image?: string;
    description?: string;
}

interface UpdateAdminCategoryInput {
    name: string;
    slug: string;
    image?: string;
    description?: string;
}

export async function getAdminCategories() {
    return prisma.category.findMany({
        orderBy: {
            id: "asc",
        },
    });
}

export async function getAdminCategory(
    id: number
) {
    const category =
        await prisma.category.findUnique({
            where: {
                id,
            },
        });

    if (!category) {
        throw new Error(
            "La categoría no existe"
        );
    }

    return category;
}

export async function createAdminCategory(
    data: CreateAdminCategoryInput
) {
    const existingCategory =
        await prisma.category.findFirst({
            where: {
                OR: [
                    {
                        name: data.name,
                    },
                    {
                        slug: data.slug,
                    },
                ],
            },
        });

    if (existingCategory) {
        throw new Error(
            "Ya existe una categoría con ese nombre o slug"
        );
    }

    return prisma.category.create({
        data: {
            name: data.name,
            slug: data.slug,
            image: data.image ?? "",
            description:
                data.description ?? "",
        },
    });
}

export async function updateAdminCategory(
    id: number,
    data: UpdateAdminCategoryInput
) {
    const category =
        await prisma.category.findUnique({
            where: {
                id,
            },
        });

    if (!category) {
        throw new Error(
            "La categoría no existe"
        );
    }

    const existingCategory =
        await prisma.category.findFirst({
            where: {
                OR: [
                    {
                        name: data.name,
                    },
                    {
                        slug: data.slug,
                    },
                ],
                NOT: {
                    id,
                },
            },
        });

    if (existingCategory) {
        throw new Error(
            "Ya existe otra categoría con ese nombre o slug"
        );
    }

    return prisma.category.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            slug: data.slug,
            image: data.image ?? "",
            description:
                data.description ?? "",
        },
    });
}

export async function deleteAdminCategory(
    id: number
) {
    const category =
        await prisma.category.findUnique({
            where: {
                id,
            },
            include: {
                products: true,
            },
        });

    if (!category) {
        throw new Error(
            "La categoría no existe"
        );
    }

    if (category.products.length > 0) {
        throw new Error(
            "No se puede eliminar una categoría que tiene productos asociados"
        );
    }

    return prisma.category.delete({
        where: {
            id,
        },
    });
}