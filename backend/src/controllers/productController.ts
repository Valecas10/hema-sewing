import { Request, Response } from "express";

import {
    getAllProducts,
    getProductBySlug,
} from "../services/productService";

export async function getProducts(
    _req: Request,
    res: Response
) {
    try {
        const products =
            await getAllProducts();

        res.json(products);
    } catch (error) {
        console.error(
            "Error al obtener productos:",
            error
        );

        res.status(500).json({
            message:
                "Error al obtener los productos",
        });
    }
}

export async function getProduct(
    req: Request,
    res: Response
) {
    try {
        const slug = Array.isArray(req.params.slug)
        ? req.params.slug[0]
        : req.params.slug;

    if (!slug) {
        res.status(400).json({
            message: "Slug de producto requerido",
        });

        return;
    }

    const product =
        await getProductBySlug(slug);

        if (!product) {
            res.status(404).json({
                message:
                    "Producto no encontrado",
            });

            return;
        }

        res.json(product);
    } catch (error) {
        console.error(
            "Error al obtener el producto:",
            error
        );

        res.status(500).json({
            message:
                "Error al obtener el producto",
        });
    }
}