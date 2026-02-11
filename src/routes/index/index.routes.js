import { Router } from "express";
import { renderHome } from "../../controllers/index/index.controller.js";

const router = Router();
router.get("", renderHome);

export default router;