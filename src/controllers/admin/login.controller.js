// import { db } from "../../config/db.js";
// import { getStartData, getBarber } from "../../services/1_start.Service.js";
// import {} from "../../services/2_service.Service.js";

// Pagina admin general
export async function panelLogin(req, res) {
  try {
    res.render("./partials/login.ejs");
  } catch (error) {
    console.error("Error consultando servicios:", error);
    res.status(500).send("Error interno del servidor");
  }
}
