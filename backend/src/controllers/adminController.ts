import { Request, Response } from "express";

import {
    loginAdmin,
} from "../services/adminService";

import {
    AuthRequest,
} from "../middleware/authMiddleware";

import {
    getAdminProducts,
    getAdminCategories,
    getAdminFabrics,
    createAdminProduct,
    updateAdminProduct,
    getAdminProduct,
} from "../services/adminProductService";

import {
    getAdminDashboard,
} from "../services/adminDashboardService";

export async function postAdminLogin(
    req: Request,
    res: Response
) {
    try {
        const { email, password } =
            req.body;

        if (!email || !password) {
            return res.status(400).json({
                message:
                    "Email y contraseña son obligatorios",
            });
        }

        const result = await loginAdmin(
            email,
            password
        );

        return res.json(result);
    } catch (error) {
        console.error(
            "Error en login de administrador:",
            error
        );

        return res.status(401).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo iniciar sesión",
        });
    }
}

export function getAdminProfile(
    req: AuthRequest,
    res: Response
) {
    res.json({
        admin: req.admin,
    });
}

export async function getProductsAdmin(
    _req: AuthRequest,
    res: Response
) {
    try {
        const products =
            await getAdminProducts();

        return res.json(products);
    } catch (error) {
        console.error(
            "Error al obtener productos:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudieron obtener los productos",
        });
    }
}

export async function getDashboard(
    _req: AuthRequest,
    res: Response
) {
    try {
        const dashboard =
            await getAdminDashboard();

        return res.json(dashboard);
    } catch (error) {
        console.error(
            "Error al obtener dashboard:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudo obtener la información del dashboard",
        });
    }
}

export async function createProductAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const {
            name,
            slug,
            description,
            price,
            stock,
            featured,
            embroidery,
            categoryId,
            fabricId,
            images,
        } = req.body;

        if (
            !name ||
            !slug ||
            !description ||
            price === undefined ||
            stock === undefined ||
            categoryId === undefined ||
            fabricId === undefined
        ) {
            return res.status(400).json({
                message:
                    "Faltan datos obligatorios",
            });
        }

        const product =
            await createAdminProduct({
                name,
                slug,
                description,
                price: Number(price),
                stock: Number(stock),
                featured: Boolean(featured),
                embroidery: Boolean(embroidery),
                categoryId: Number(categoryId),
                fabricId: Number(fabricId),
                images: Array.isArray(images)
                    ? images
                    : [],
            });

        return res.status(201).json(product);
    } catch (error) {
        console.error(
            "Error al crear producto:",
            error
        );

        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo crear el producto",
        });
    }
}

export async function getCategoriesAdmin(
    _req: AuthRequest,
    res: Response
) {
    try {
        const categories =
            await getAdminCategories();

        return res.json(categories);
    } catch (error) {
        console.error(
            "Error al obtener categorías:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudieron obtener las categorías",
        });
    }
}

export async function getFabricsAdmin(
    _req: AuthRequest,
    res: Response
) {
    try {
        const fabrics =
            await getAdminFabrics();

        return res.json(fabrics);
    } catch (error) {
        console.error(
            "Error al obtener telas:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudieron obtener las telas",
        });
    }
}

export async function updateProductAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id = Number(
            req.params.id
        );

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de producto inválido",
            });
        }

        const {
            name,
            slug,
            description,
            price,
            stock,
            featured,
            embroidery,
            categoryId,
            fabricId,
        } = req.body;

        if (
            !name ||
            !slug ||
            !description ||
            price === undefined ||
            stock === undefined ||
            categoryId === undefined ||
            fabricId === undefined
        ) {
            return res.status(400).json({
                message:
                    "Faltan datos obligatorios",
            });
        }

        const product =
            await updateAdminProduct(id, {
                name,
                slug,
                description,
                price: Number(price),
                stock: Number(stock),
                featured: Boolean(featured),
                embroidery: Boolean(embroidery),
                categoryId: Number(categoryId),
                fabricId: Number(fabricId),
            });

        return res.json(product);
    } catch (error) {
        console.error(
            "Error al actualizar producto:",
            error
        );

        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar el producto",
        });
    }
}

export async function getProductAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id = Number(
            req.params.id
        );

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de producto inválido",
            });
        }

        const product =
            await getAdminProduct(id);

        return res.json(product);
    } catch (error) {
        console.error(
            "Error al obtener producto:",
            error
        );

        return res.status(404).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo obtener el producto",
        });
    }
}