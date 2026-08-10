import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { categories } from "../../src/data/categories";
import { fabrics } from "../../src/data/fabrics";
import { products } from "../../src/data/products";

const connectionString =
    process.env.DATABASE_URL;

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

async function main() {
    console.log("🌱 Iniciando seed...");

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.fabric.deleteMany();
    await prisma.category.deleteMany();

    console.log("🧹 Base de datos limpiada");

    // Categorías
    for (const category of categories) {
        await prisma.category.create({
            data: {
                name: category.name,
                slug: category.slug,
                image: category.image,
                description: category.description,
            },
        });
    }

    console.log(
        `✅ ${categories.length} categorías creadas`
    );

    // Telas
    for (const fabric of fabrics) {
        await prisma.fabric.create({
            data: {
                name: fabric.name,
                slug: fabric.slug,
            },
        });
    }

    console.log(
        `✅ ${fabrics.length} telas creadas`
    );

    // Productos
    for (const product of products) {
        const category = await prisma.category.findUnique({
            where: {
                slug: product.category.slug,
            },
        });

        const fabric = await prisma.fabric.findUnique({
            where: {
                slug: product.fabric.slug,
            },
        });

        if (!category || !fabric) {
            throw new Error(
                `No se encontró la categoría o tela del producto: ${product.name}`
            );
        }

        await prisma.product.create({
            data: {
                name: product.name,
                slug: product.slug,
                description: product.description,
                price: product.price,
                stock: product.stock,
                featured: product.featured,
                embroidery: product.embroidery,

                categoryId: category.id,
                fabricId: fabric.id,

                images: {
                    create: product.images.map((image) => ({
                        url: image.url,
                        alt: image.alt,
                        order: image.order,
                    })),
                },
            },
        });
    }

    console.log(
        `✅ ${products.length} productos creados`
    );

    console.log("🌱 Seed completado");
}

main()
    .catch((error) => {
        console.error(
            "❌ Error durante el seed:",
            error
        );

        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });