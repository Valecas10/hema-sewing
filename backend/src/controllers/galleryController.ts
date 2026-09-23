import {
    Request,
    Response,
} from "express";

import {
    getPublicGallery,
} from "../services/adminGalleryService";

export async function getGallery(
    _req: Request,
    res: Response
) {
    try {
        const gallery =
            await getPublicGallery();

        return res.json(gallery);
    } catch (error) {
        console.error(
            "Error al obtener galería:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudo obtener la galería",
        });
    }
}