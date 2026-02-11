import { db } from "../config/db.js";

export async function obtenerReservasPorFechaYBarbero(fecha, barberoId) {
  return db.query(
    `SELECT TO_CHAR(r.hora, 'HH24:MI') AS hora, s.duration AS duracion 
     FROM reservas r 
     JOIN servicios s ON r.servicio_id = s.id 
     WHERE r.fecha = $1 AND r.barbero_id = $2;`,
    [fecha, barberoId]
  );
}
