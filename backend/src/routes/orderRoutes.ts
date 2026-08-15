import { Router } from "express";

import {
    postOrder,
} from "../controllers/orderController";

const router = Router();

router.post("/", postOrder);

export default router;