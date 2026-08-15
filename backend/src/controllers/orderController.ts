import { Request, Response } from "express";

import {
    createOrder,
} from "../services/orderService";

export async function postOrder(
    req: Request,
    res: Response
) {
    try {
        const order =
            await createOrder(req.body);

        res.status(201).json(order);
    } catch (error) {
        console.error(
            "Error al crear la orden:",
            error
        );

        res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "Error al crear la orden",
        });
    }
}