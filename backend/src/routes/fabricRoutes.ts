import { Router } from "express";

import {
    getFabrics,
} from "../controllers/fabricController";

const router = Router();

router.get("/", getFabrics);

export default router;