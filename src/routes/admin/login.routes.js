import { Router } from "express";
import {
  panelLogin,
} from "../../controllers/admin/login.controller.js";

const router = Router();

// /admin
router.get("", panelLogin);

export default router;
