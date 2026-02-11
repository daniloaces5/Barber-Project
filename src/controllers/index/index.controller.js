import { getPrincipalData } from "../../services/indexService.js";

export const renderHome = async (req, res) => {
  try {
    const result = await getPrincipalData();
    res.render("index", { title: "Inicio", data: result.rows[0] });
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res.status(500).send("Error interno del servidor");
  }
};