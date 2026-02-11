import { db } from "../config/db.js";

export async function guardarReservas(estado_actual) {
  return db.query(
    `INSERT INTO reservas (
        barbero_id,
        servicio_id,
        fecha,
        hora,
        cliente_nombre,
        email,
        phone
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      estado_actual.barbero_id,
      estado_actual.servicio_id,
      estado_actual.data,
      estado_actual.time,
      estado_actual.user_name,
      estado_actual.user_email,
      estado_actual.user_phone
    ]
  );
}
