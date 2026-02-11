import { getStartData } from "../../services/1_start.Service.js";

export async function renderStart(req, res) {
  try {
    const { rows: barberos } = await getStartData();
    res.render("turn_registration/1_profesional", { barberos });
  } catch (error) {
    console.error("Error consultando barberos:", error);
    res.status(500).send("Error interno del servidor");
  }
}
