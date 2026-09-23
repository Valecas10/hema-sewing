import { Router } from "express";

import {
    postAdminLogin,
    getAdminProfile,
    getProductsAdmin,
    createProductAdmin,
    getDashboard,
    getCategoriesAdmin,
    updateProductAdmin,
    getProductAdmin,
    deleteProductAdmin,
    getFabricAdmin,
    createFabricAdmin,
    updateFabricAdmin,
    deleteFabricAdmin,
    getCategoryAdmin,
    createCategoryAdmin,
    updateCategoryAdmin,
    deleteCategoryAdmin,
    getFabricsAdmin,
    getOrdersAdmin,
    getOrderAdmin,
    updateOrderStatusAdmin,
    getContactAdmin,
    updateContactAdmin,
    getGalleryAdmin,
    uploadGalleryImageAdmin,
    updateGalleryImageAdmin,
    deleteGalleryImageAdmin
} from "../controllers/adminController";

import {
    authenticateAdmin,
} from "../middleware/authMiddleware";

import {
    uploadGalleryImage,
} from "../middleware/uploadMiddleware";

const router = Router();

router.post(
    "/login",
    postAdminLogin
);

router.get(
    "/me",
    authenticateAdmin,
    getAdminProfile
);

router.get(
    "/products",
    authenticateAdmin,
    getProductsAdmin
);

router.get(
    "/dashboard",
    authenticateAdmin,
    getDashboard
);

router.post(
    "/products",
    authenticateAdmin,
    createProductAdmin
);

router.get(
    "/categories",
    authenticateAdmin,
    getCategoriesAdmin
);

router.get(
    "/fabrics",
    getFabricsAdmin,
    getFabricAdmin,
    createFabricAdmin,
);

router.put(
    "/products/:id",
    authenticateAdmin,
    updateProductAdmin
);

router.get(
    "/products/:id",
    authenticateAdmin,
    getProductAdmin
);

router.delete(
    "/products/:id",
    authenticateAdmin,
    deleteProductAdmin
);

router.get(
    "/categories/:id",
    authenticateAdmin,
    getCategoryAdmin
);

router.post(
    "/categories",
    authenticateAdmin,
    createCategoryAdmin
);

router.put(
    "/categories/:id",
    authenticateAdmin,
    updateCategoryAdmin
);

router.delete(
    "/categories/:id",
    authenticateAdmin,
    deleteCategoryAdmin
);

router.get(
    "/fabrics/:id",
    authenticateAdmin,
    getFabricAdmin
);

router.post(
    "/fabrics",
    authenticateAdmin,
    createFabricAdmin
);

router.put(
    "/fabrics/:id",
    authenticateAdmin,
    updateFabricAdmin
);

router.delete(
    "/fabrics/:id",
    authenticateAdmin,
    deleteFabricAdmin
);

router.get(
    "/orders",
    authenticateAdmin,
    getOrdersAdmin
);

router.get(
    "/orders/:id",
    authenticateAdmin,
    getOrderAdmin
);

router.put(
    "/orders/:id/status",
    authenticateAdmin,
    updateOrderStatusAdmin
);

router.get(
    "/contact",
    authenticateAdmin,
    getContactAdmin
);

router.put(
    "/contact",
    authenticateAdmin,
    updateContactAdmin
);

router.get(
    "/gallery",
    authenticateAdmin,
    getGalleryAdmin
);

router.post(
    "/gallery/upload",
    authenticateAdmin,
    uploadGalleryImage.single("image"),
    uploadGalleryImageAdmin
);

router.put(
    "/gallery/:id",
    authenticateAdmin,
    updateGalleryImageAdmin
);

router.delete(
    "/gallery/:id",
    authenticateAdmin,
    deleteGalleryImageAdmin
);

export default router;