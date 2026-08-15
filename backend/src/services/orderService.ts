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

interface OrderItemInput {
    productId: number;
    quantity: number;
}

interface CreateOrderInput {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryMethod: "pickup" | "shipping";
    address?: string;
    city?: string;
    postalCode?: string;
    items: OrderItemInput[];
}

export async function createOrder(
    data: CreateOrderInput
) {
    return prisma.$transaction(async (tx) => {
        let total = 0;

        const orderItems = [];

        for (const item of data.items) {
            const product =
                await tx.product.findUnique({
                    where: {
                        id: item.productId,
                    },
                });

            if (!product) {
                throw new Error(
                    `Producto ${item.productId} no encontrado`
                );
            }

            if (item.quantity <= 0) {
                throw new Error(
                    "La cantidad debe ser mayor a 0"
                );
            }

            if (product.stock < item.quantity) {
                throw new Error(
                    `Stock insuficiente para ${product.name}`
                );
            }

            total +=
                product.price * item.quantity;

            orderItems.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price,
            });
        }

        const order =
            await tx.order.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    deliveryMethod:
                        data.deliveryMethod,
                    address:
                        data.deliveryMethod ===
                        "shipping"
                            ? data.address
                            : null,
                    city:
                        data.deliveryMethod ===
                        "shipping"
                            ? data.city
                            : null,
                    postalCode:
                        data.deliveryMethod ===
                        "shipping"
                            ? data.postalCode
                            : null,
                    total,
                    items: {
                        create: orderItems,
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            });

        for (const item of data.items) {
            await tx.product.update({
                where: {
                    id: item.productId,
                },
                data: {
                    stock: {
                        decrement: item.quantity,
                    },
                },
            });
        }

        return order;
    });
}