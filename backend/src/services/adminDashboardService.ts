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

export async function getAdminDashboard() {
    const [
        productsCount,
        ordersCount,
        lowStockProducts,
        recentOrders,
    ] = await Promise.all([
        prisma.product.count(),

        prisma.order.count(),

        prisma.product.findMany({
            where: {
                stock: {
                    gt: -1,
                    lte: 3,
                },
            },
            select: {
                id: true,
                name: true,
                stock: true,
            },
            orderBy: {
                stock: "asc",
            },
        }),

        prisma.order.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                total: true,
                createdAt: true,
            },
        }),
    ]);

    return {
        productsCount,
        ordersCount,
        lowStockProducts,
        recentOrders,
    };
}