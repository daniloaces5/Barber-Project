import { Router } from "express";
import {
  panelregist,
  resregist,
} from "../../controllers/admin/regist.controller.js";

const router = Router();

// /admin
router.get("", panelregist);
router.post("", resregist);

export default router;
