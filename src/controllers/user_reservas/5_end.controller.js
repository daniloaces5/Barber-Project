import { guardarReservas } from "../../services/5_end.Service.js";
import { estado_actual } from "./4_confirm.controller.js";

export async function endler(req, res) {
  estado_actual.user_name = req.body.name
  estado_actual.user_email = req.body.email
  estado_actual.user_phone = req.body.phone
  console.log(estado_actual)
  await guardarReservas(estado_actual)
  res.render("turn_registration/5_end");
}