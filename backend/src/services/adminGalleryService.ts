import "dotenv/config";

import {
    PrismaClient,
} from "../generated/prisma/client";

import {
    PrismaPg,
} from "@prisma/adapter-pg";

const connectionString =
    process.env.DATABASE_URL;

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

export async function getAdminGallery() {
    return prisma.homeGalleryImage.findMany({
        orderBy: {
            order: "asc",
        },
    });
}

export async function getPublicGallery() {
    return prisma.homeGalleryImage.findMany({
        where: {
            active: true,
        },
        orderBy: {
            order: "asc",
        },
    });
}

export async function createGalleryImage(
    data: {
        url: string;
        alt?: string;
        order?: number;
        active?: boolean;
    }
) {
    return prisma.homeGalleryImage.create({
        data: {
            url: data.url,
            alt: data.alt ?? "",
            order: data.order ?? 0,
            active:
                data.active ?? true,
        },
    });
}

export async function updateGalleryImage(
    id: number,
    data: {
        alt?: string;
        order?: number;
        active?: boolean;
    }
) {
    return prisma.homeGalleryImage.update({
        where: {
            id,
        },
        data,
    });
}

export async function deleteGalleryImage(
    id: number
) {
    return prisma.homeGalleryImage.delete({
        where: {
            id,
        },
    });
}