import { generarHorariosDisponibles } from "../../utils/generarHorariosDisponibles.js";
import { obtenerReservasPorFechaYBarbero } from "../../services/3_datatime.Service.js";
import { estado_actual } from "../../controllers/user_reservas/2_service.controller.js";

export async function guardarServiceYData(req, res) {
  estado_actual.servicio_id = req.body.serviceId;
  estado_actual.servicio = req.body.serviceName;
  estado_actual.servicio_price = req.body.servicePrice;
  estado_actual.servicio_time = parseInt(req.body.serviceDuration);
  estado_actual.data = req.body.data;

  try {
    const { rows: reservas } = await obtenerReservasPorFechaYBarbero(
      estado_actual.data,
      estado_actual.barbero_id
    );

    const duracionServicio = estado_actual.servicio_time || 30;
    const horarios = generarHorariosDisponibles(reservas, duracionServicio);

    res.render("turn_registration/3_datatime", { horarios, estado_actual });
  } catch (error) {
    console.error("Error consultando reservas:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export { estado_actual };