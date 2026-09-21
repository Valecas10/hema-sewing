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

export async function getContactInfo() {
    const prismaClient = prisma as any;

    return prismaClient.contactInfo.findUnique({
        where: {
            id: 1,
        },
    });
}