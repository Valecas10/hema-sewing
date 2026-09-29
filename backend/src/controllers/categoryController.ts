import { Request, Response } from "express";

import {
    getAllCategories,
} from "../services/categoryService";

import { AuthRequest } from "../middleware/authMiddleware";

export async function getCategories(
    _req: Request,
    res: Response
) {
    try {
        const categories =
            await getAllCategories();

        res.json(categories);
    } catch (error) {
        console.error(
            "Error al obtener categorías:",
            error
        );

        res.status(500).json({
            message:
                "Error al obtener las categorías",
        });
    }
}

export async function uploadCategoryImageAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No se seleccionó ninguna imagen",
            });
        }

        return res.status(201).json({
            url: `/uploads/categories/${req.file.filename}`,
        });
    } catch (error) {
        console.error(
            "Error al subir imagen de categoría:",
            error
        );

        return res.status(500).json({
            message: "No se pudo subir la imagen",
        });
    }
}