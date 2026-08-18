import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    admin?: {
        adminId: number;
        email: string;
    };
}

export function authenticateAdmin(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader =
        req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No autorizado",
        });
    }

    const [type, token] =
        authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return res.status(401).json({
            message:
                "Token de autorización inválido",
        });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(500).json({
            message:
                "JWT_SECRET no está configurado",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            secret
        ) as {
            adminId: number;
            email: string;
        };

        req.admin = decoded;

        next();
    } catch {
        return res.status(401).json({
            message: "Token inválido o expirado",
        });
    }
}