import { Request, Response } from "express";

import {
    getAllCategories,
} from "../services/categoryService";

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