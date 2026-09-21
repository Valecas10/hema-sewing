import { Request, Response } from "express";

import {
    getContactInfo,
} from "../services/contactService";

export async function getContact(
    _req: Request,
    res: Response
) {
    try {
        const contact =
            await getContactInfo();

        if (!contact) {
            return res.status(404).json({
                message:
                    "No existe información de contacto",
            });
        }

        return res.json(contact);
    } catch (error) {
        console.error(
            "Error al obtener contacto:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudo obtener la información de contacto",
        });
    }
}