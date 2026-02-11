import { estado_actual } from "../../controllers/user_reservas/3_datatime.controller.js";

export function guardarData(req, res) {
  estado_actual.time = req.body.hora;
  res.render("turn_registration/4_confirmation", { estado_actual });
}

export { estado_actual };