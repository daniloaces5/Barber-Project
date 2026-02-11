import { db } from "../config/db.js";

export async function getServiceData(barberoId) {
  return db.query(
    "SELECT * FROM servicios s JOIN barbero_servicio b ON s.id = b.servicio_id WHERE b.barbero_id = $1;",
    [barberoId]
  );
}

export async function getServiceAll() {
  return db.query("SELECT * FROM servicios");
}

export async function getBarberService(id) {
  return db.query(
    "SELECT servicio_id FROM barbero_servicio WHERE barbero_id = $1",
    [id]
  );
}

export async function getServiceEdit(id) {
  return db.query("SELECT * FROM servicios WHERE id = $1", [id]);
}

export async function newService(servicio) {
  await db.query(
    `INSERT INTO servicios (
        name, duration, price
    ) VALUES ($1, $2, $3)`,
    [servicio.name, servicio.duration, servicio.price]
  );
}

export async function updateBarber(id, servicio) {
  await db.query(
    `UPDATE servicios
    SET name = $1,
    duration = $2,
    price = $3
    WHERE id = $4; `,
    [servicio.name, servicio.duration, servicio.price, id]
  );
}

export async function deleteService(id) {
  await db.query(`DELETE FROM servicios WHERE id = $1`, [id]);
}

export async function deleteBarberos(id) {
  await db.query(`DELETE FROM barberos WHERE id = $1`, [id]);
}
