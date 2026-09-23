import { Request, Response } from "express";

import {
    loginAdmin,
} from "../services/adminService";

import {
    AuthRequest,
} from "../middleware/authMiddleware";

import {
    getAdminProducts,
    createAdminProduct,
    updateAdminProduct,
    getAdminProduct,
    deleteAdminProduct,
} from "../services/adminProductService";

import {
    getAdminCategories,
    getAdminCategory,
    createAdminCategory,
    updateAdminCategory,
    deleteAdminCategory,
} from "../services/adminCategoryService";

import {
    getAdminFabrics,
    getAdminFabric,
    createAdminFabric,
    updateAdminFabric,
    deleteAdminFabric,
} from "../services/adminFabricService";

import {
    getAdminOrders,
    getAdminOrder,
    updateAdminOrderStatus,
} from "../services/adminOrderService";

import {
    getAdminDashboard,
} from "../services/adminDashboardService";

import {
    getAdminContactInfo,
    updateAdminContactInfo,
} from "../services/adminContactService";

import {
    getAdminGallery,
    createGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,
} from "../services/adminGalleryService";

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
                images: Array.isArray(images)
                    ? images
                    : [],
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

export async function deleteProductAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "ID de producto inválido",
            });
        }

        await deleteAdminProduct(id);

        return res.status(204).send();
    } catch (error) {
        console.error(
            "Error al eliminar producto:",
            error
        );

        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar el producto",
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

export async function getCategoryAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de categoría inválido",
            });
        }

        const category =
            await getAdminCategory(id);

        return res.json(category);
    } catch (error) {
        return res.status(404).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo obtener la categoría",
        });
    }
}

export async function createCategoryAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const {
            name,
            slug,
            image,
            description,
        } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                message:
                    "Nombre y slug son obligatorios",
            });
        }

        const category =
            await createAdminCategory({
                name,
                slug,
                image,
                description,
            });

        return res.status(201).json(category);
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo crear la categoría",
        });
    }
}

export async function updateCategoryAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de categoría inválido",
            });
        }

        const {
            name,
            slug,
            image,
            description,
        } = req.body;

        if (!name || !slug) {
            return res.status(400).json({
                message:
                    "Nombre y slug son obligatorios",
            });
        }

        const category =
            await updateAdminCategory(id, {
                name,
                slug,
                image,
                description,
            });

        return res.json(category);
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar la categoría",
        });
    }
}

export async function deleteCategoryAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de categoría inválido",
            });
        }

        await deleteAdminCategory(id);

        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar la categoría",
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

export async function getFabricAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de tela inválido",
            });
        }

        const fabric =
            await getAdminFabric(id);

        return res.json(fabric);
    } catch (error) {
        return res.status(404).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo obtener la tela",
        });
    }
}

export async function createFabricAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const { name, slug } =
            req.body;

        if (!name || !slug) {
            return res.status(400).json({
                message:
                    "Nombre y slug son obligatorios",
            });
        }

        const fabric =
            await createAdminFabric({
                name,
                slug,
            });

        return res.status(201).json(fabric);
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo crear la tela",
        });
    }
}

export async function updateFabricAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de tela inválido",
            });
        }

        const { name, slug } =
            req.body;

        if (!name || !slug) {
            return res.status(400).json({
                message:
                    "Nombre y slug son obligatorios",
            });
        }

        const fabric =
            await updateAdminFabric(id, {
                name,
                slug,
            });

        return res.json(fabric);
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar la tela",
        });
    }
}

export async function deleteFabricAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de tela inválido",
            });
        }

        await deleteAdminFabric(id);

        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo eliminar la tela",
        });
    }
}

export async function getOrdersAdmin(
    _req: AuthRequest,
    res: Response
) {
    try {
        const orders =
            await getAdminOrders();

        return res.json(orders);
    } catch (error) {
        console.error(
            "Error al obtener pedidos:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudieron obtener los pedidos",
        });
    }
}

export async function getOrderAdmin(
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
                    "ID de pedido inválido",
            });
        }

        const order =
            await getAdminOrder(id);

        return res.json(order);
    } catch (error) {
        return res.status(404).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo obtener el pedido",
        });
    }
}

export async function updateOrderStatusAdmin(
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
                    "ID de pedido inválido",
            });
        }

        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                message:
                    "El estado es obligatorio",
            });
        }

        const order =
            await updateAdminOrderStatus(
                id,
                status
            );

        return res.json(order);
    } catch (error) {
        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar el estado",
        });
    }
}

export async function getContactAdmin(
    _req: AuthRequest,
    res: Response
) {
    try {
        const contact =
            await getAdminContactInfo();

        return res.json(contact);
    } catch (error) {
        console.error(
            "Error al obtener información de contacto:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudo obtener la información de contacto",
        });
    }
}

export async function updateContactAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const {
            email,
            phone,
            instagram,
            facebook,
            tiktok,
            whatsapp,
            instagramEnabled,
            facebookEnabled,
            tiktokEnabled,
            whatsappEnabled,
        } = req.body;

        if (!email || !phone) {
            return res.status(400).json({
                message:
                    "Email y teléfono son obligatorios",
            });
        }

        const contact =
            await updateAdminContactInfo({
                email,
                phone,
                instagram,
                facebook,
                tiktok,
                whatsapp,
                instagramEnabled:
                    Boolean(
                        instagramEnabled
                    ),
                facebookEnabled:
                    Boolean(
                        facebookEnabled
                    ),
                tiktokEnabled:
                    Boolean(
                        tiktokEnabled
                    ),
                whatsappEnabled:
                    Boolean(
                        whatsappEnabled
                    ),
            });

        return res.json(contact);
    } catch (error) {
        console.error(
            "Error al actualizar información de contacto:",
            error
        );

        return res.status(400).json({
            message:
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar la información de contacto",
        });
    }
}

export async function getGalleryAdmin(
    _req: AuthRequest,
    res: Response
) {
    try {
        const gallery =
            await getAdminGallery();

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

export async function uploadGalleryImageAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message:
                    "No se seleccionó ninguna imagen",
            });
        }

        const image =
            await createGalleryImage({
                url: `/uploads/gallery/${req.file.filename}`,
                alt:
                    req.body.alt ??
                    req.file.originalname,
                order:
                    Number(req.body.order) || 0,
                active: true,
            });

        return res.status(201).json(image);
    } catch (error) {
        console.error(
            "Error al subir imagen:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudo subir la imagen",
        });
    }
}

export async function updateGalleryImageAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id =
            Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de imagen inválido",
            });
        }

        const image =
            await updateGalleryImage(
                id,
                {
                    alt:
                        req.body.alt,
                    order:
                        req.body.order !==
                        undefined
                            ? Number(
                                  req.body.order
                              )
                            : undefined,
                    active:
                        req.body.active !==
                        undefined
                            ? Boolean(
                                  req.body.active
                              )
                            : undefined,
                }
            );

        return res.json(image);
    } catch (error) {
        console.error(
            "Error al actualizar imagen:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudo actualizar la imagen",
        });
    }
}

export async function deleteGalleryImageAdmin(
    req: AuthRequest,
    res: Response
) {
    try {
        const id =
            Number(req.params.id);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message:
                    "ID de imagen inválido",
            });
        }

        await deleteGalleryImage(id);

        return res.json({
            message:
                "Imagen eliminada correctamente",
        });
    } catch (error) {
        console.error(
            "Error al eliminar imagen:",
            error
        );

        return res.status(500).json({
            message:
                "No se pudo eliminar la imagen",
        });
    }
}