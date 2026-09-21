import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
}) as PrismaClient & {
    contactInfo: any;
};

export async function getAdminContactInfo() {
    return prisma.contactInfo.findUnique({
        where: {
            id: 1,
        },
    });
}

export async function updateAdminContactInfo(
    data: {
        email: string;
        phone: string;
        instagram?: string;
        facebook?: string;
        tiktok?: string;
        whatsapp?: string;
        instagramEnabled: boolean;
        facebookEnabled: boolean;
        tiktokEnabled: boolean;
        whatsappEnabled: boolean;
    }
) {
    return prisma.contactInfo.upsert({
        where: {
            id: 1,
        },
        update: {
            email: data.email,
            phone: data.phone,
            instagram: data.instagram || null,
            facebook: data.facebook || null,
            tiktok: data.tiktok || null,
            whatsapp: data.whatsapp || null,
            instagramEnabled:
                data.instagramEnabled,
            facebookEnabled:
                data.facebookEnabled,
            tiktokEnabled:
                data.tiktokEnabled,
            whatsappEnabled:
                data.whatsappEnabled,
        },
        create: {
            id: 1,
            email: data.email,
            phone: data.phone,
            instagram: data.instagram || null,
            facebook: data.facebook || null,
            tiktok: data.tiktok || null,
            whatsapp: data.whatsapp || null,
            instagramEnabled:
                data.instagramEnabled,
            facebookEnabled:
                data.facebookEnabled,
            tiktokEnabled:
                data.tiktokEnabled,
            whatsappEnabled:
                data.whatsappEnabled,
        },
    });
}
