import { get_reservas } from "../../services/mis_reservas.Service.js";
import { delete_reserva_tabla } from "../../services/mis_reservas.Service.js";

let email = "";
let reservas = "";

export function get_mis_reservas(req, res) {
  reservas = "";
  res.render("mis_reservas/mis_reservas", { reservas });
}

export async function show_mis_reservas(req, res) {
  email = req.body.email;
  try {
    reservas = await get_reservas(email);
    if (reservas.rows.length > 0) {
      res.render("mis_reservas/mis_reservas", { reservas: reservas.rows });
    } else {
      res.send("NO se encontro el correo");
    }
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).send(`Ocurrió un error al cargar bd.`);
  }
}

export async function delete_reserva(req, res) {
  const id = req.body.reserva_id;
  console.log(email);
  try {
    await delete_reserva_tabla(id);
    try {
      reservas = await get_reservas(email);
      console.log(email);
      if (reservas.rows.length > 0) {
        res.render("mis_reservas/mis_reservas", { reservas: reservas.rows });
      } else {
        res.send("NO se encontro el correo");
      }
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      res.status(500).send(`Ocurrió un error al cargar bd.`);
    }
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    res.status(500).send(`Ocurrió un error al cargar bd.`);
  }
}
