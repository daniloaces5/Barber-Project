import { Router } from "express";
import { renderStart } from "../../controllers/user_reservas/1_start.controller.js";
import { renderService } from "../../controllers/user_reservas/2_service.controller.js";
import { guardarServiceYData } from "../../controllers/user_reservas/3_datatime.controller.js";
import { guardarData } from "../../controllers/user_reservas/4_confirm.controller.js";
import { endler } from "../../controllers/user_reservas/5_end.controller.js";

const router = Router();
router.get("/start", renderStart);
router.post("/service", renderService);
router.post("/guardar-service&data", guardarServiceYData);
router.post("/guardar-data", guardarData);
router.post("/end", endler);

export default router;