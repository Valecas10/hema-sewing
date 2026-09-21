import { Router } from "express";
import { getContact } from "../controllers/contactController";

const router = Router();

router.get("/", getContact);

export default router;