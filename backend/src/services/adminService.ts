import "dotenv/config";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({
    connectionString,
});

const prisma = new PrismaClient({
    adapter,
});

export async function loginAdmin(
    email: string,
    password: string
) {
    const admin =
        await prisma.admin.findUnique({
            where: {
                email,
            },
        });

    if (!admin) {
        throw new Error(
            "Email o contraseña incorrectos"
        );
    }

    const passwordIsValid =
        await bcrypt.compare(
            password,
            admin.password
        );

    if (!passwordIsValid) {
        throw new Error(
            "Email o contraseña incorrectos"
        );
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error(
            "JWT_SECRET no está configurado"
        );
    }

    const token = jwt.sign(
        {
            adminId: admin.id,
            email: admin.email,
        },
        secret,
        {
            expiresIn: "2h",
        }
    );

    return {
        token,
        admin: {
            id: admin.id,
            email: admin.email,
        },
    };
}

export async function uploadCategoryImage(
    file: File
): Promise<{ url: string }> {
    const token = localStorage.getItem("adminToken");

    const formData = new FormData();

    formData.append("image", file);

    const response = await fetch(
        `${connectionString}/admin/categories/upload-image`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(
            result.message ||
            "No se pudo subir la imagen"
        );
    }

    return result;
}

