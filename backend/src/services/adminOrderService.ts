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

export async function getAdminOrders() {
    return prisma.order.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
}

export async function getAdminOrder(
    id: number
) {
    const order =
        await prisma.order.findUnique({
            where: {
                id,
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

    if (!order) {
        throw new Error(
            "El pedido no existe"
        );
    }

    return order;
}

const validStatuses = [
    "PENDIENTE",
    "CONFIRMADO",
    "PREPARANDO",
    "ENVIADO",
    "ENTREGADO",
];

export async function updateAdminOrderStatus(
    id: number,
    status: string
) {
    const order =
        await prisma.order.findUnique({
            where: {
                id,
            },
        });

    if (!order) {
        throw new Error(
            "El pedido no existe"
        );
    }

    if (!validStatuses.includes(status)) {
        throw new Error(
            "Estado de pedido inválido"
        );
    }

    return prisma.order.update({
        where: {
            id,
        },
        data: {
            status,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
}