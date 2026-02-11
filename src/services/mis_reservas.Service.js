import { db } from "../config/db.js";

export async function get_reservas(reservas) {
  return db.query(
    `SELECT r.id,
            r.cliente_nombre,
            TO_CHAR(r.fecha, 'DD/MM/YYYY') AS fecha,
            r.hora,
            b.name AS barbero_name,
            s.name AS service_name,
            s.duration,
            s.price
    FROM reservas r
    JOIN barberos b ON r.barbero_id = b.id
    JOIN servicios s ON r.servicio_id = s.id
    WHERE email = $1;`,
    [reservas]
  );
}


export async function delete_reserva_tabla(id) {
  return db.query(
    `DELETE
    FROM reservas
    WHERE id = $1`,
    [id]
  );
}
