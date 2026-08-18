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

export default router;