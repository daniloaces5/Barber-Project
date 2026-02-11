import { Router } from "express";
import {
  get_mis_reservas,
  show_mis_reservas,
  delete_reserva,
} from "../../controllers/mis_reservas/mis_reservas.controller.js";

const router = Router();

router.get("", get_mis_reservas);
router.post("", show_mis_reservas);
router.post("/eliminar", delete_reserva);

export default router;
