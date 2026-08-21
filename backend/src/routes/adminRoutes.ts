import { Router } from "express";

import {
    postAdminLogin,
    getAdminProfile,
    getProductsAdmin,
    createProductAdmin,
    getDashboard,
    getFabricsAdmin,
    getCategoriesAdmin,
    updateProductAdmin,
    getProductAdmin,
    deleteProductAdmin,
} from "../controllers/adminController";

import {
    getCategoryAdmin,
    createCategoryAdmin,
    updateCategoryAdmin,
    deleteCategoryAdmin,
} from "../controllers/adminController";

import {
    authenticateAdmin,
} from "../middleware/authMiddleware";

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
    authenticateAdmin,
    getFabricsAdmin
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

export default router;