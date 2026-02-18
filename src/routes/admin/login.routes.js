import { Router } from "express";
import {
  panelLogin,
  resLogin,
} from "../../controllers/admin/login.controller.js";

const router = Router();

// /admin
router.get("", panelLogin);
router.post("", resLogin);

export default router;
