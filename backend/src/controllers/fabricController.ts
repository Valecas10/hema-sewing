import { Request, Response } from "express";

import {
    getAllFabrics,
} from "../services/fabricService";

export async function getFabrics(
    _req: Request,
    res: Response
) {
    try {
        const fabrics =
            await getAllFabrics();

        res.json(fabrics);
    } catch (error) {
        console.error(
            "Error al obtener telas:",
            error
        );

        res.status(500).json({
            message:
                "Error al obtener las telas",
        });
    }
}