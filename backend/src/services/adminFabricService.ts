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

interface CreateAdminFabricInput {
    name: string;
    slug: string;
}

interface UpdateAdminFabricInput {
    name: string;
    slug: string;
}

export async function getAdminFabrics() {
    return prisma.fabric.findMany({
        orderBy: {
            id: "asc",
        },
    });
}

export async function getAdminFabric(
    id: number
) {
    const fabric =
        await prisma.fabric.findUnique({
            where: {
                id,
            },
        });

    if (!fabric) {
        throw new Error(
            "La tela no existe"
        );
    }

    return fabric;
}

export async function createAdminFabric(
    data: CreateAdminFabricInput
) {
    const existingFabric =
        await prisma.fabric.findFirst({
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

    if (existingFabric) {
        throw new Error(
            "Ya existe una tela con ese nombre o slug"
        );
    }

    return prisma.fabric.create({
        data: {
            name: data.name,
            slug: data.slug,
        },
    });
}

export async function updateAdminFabric(
    id: number,
    data: UpdateAdminFabricInput
) {
    const fabric =
        await prisma.fabric.findUnique({
            where: {
                id,
            },
        });

    if (!fabric) {
        throw new Error(
            "La tela no existe"
        );
    }

    const existingFabric =
        await prisma.fabric.findFirst({
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

    if (existingFabric) {
        throw new Error(
            "Ya existe otra tela con ese nombre o slug"
        );
    }

    return prisma.fabric.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            slug: data.slug,
        },
    });
}

export async function deleteAdminFabric(
    id: number
) {
    const fabric =
        await prisma.fabric.findUnique({
            where: {
                id,
            },
            include: {
                products: true,
            },
        });

    if (!fabric) {
        throw new Error(
            "La tela no existe"
        );
    }

    if (fabric.products.length > 0) {
        throw new Error(
            "No se puede eliminar una tela que tiene productos asociados"
        );
    }

    return prisma.fabric.delete({
        where: {
            id,
        },
    });
}