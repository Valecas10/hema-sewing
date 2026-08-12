import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

export async function getAllProducts() {
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
    });
}

export async function getProductBySlug(
    slug: string
) {
    return prisma.product.findUnique({
        where: {
            slug,
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




