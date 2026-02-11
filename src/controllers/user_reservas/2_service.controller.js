import { getServiceData } from "../../services/2_service.Service.js";

let estado_actual = {
  barbero_id: "",
  barbero_name: "",
  servicio: "",
  servicio_id: "",
  servicio_price: "",
  servicio_time: "",
  data: "",
  time: "",
  user_name: "",
  user_email: "",
  user_phone: "",
};

export async function renderService(req, res) {
  estado_actual.barbero_id = req.body.barberId;
  estado_actual.barbero_name = req.body.barberName;

  const hoy = new Date();
  const limite = new Date();
  limite.setDate(hoy.getDate() + 15);
  const formato = (fecha) => fecha.toISOString().split("T")[0];
  const min = formato(hoy);
  const max = formato(limite);

  try {
    const { rows: servicios } = await getServiceData(
      estado_actual.barbero_id
    );
    res.render("turn_registration/2_service&data", { servicios, min, max });
  } catch (error) {
    console.error("Error consultando servicios:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export { estado_actual };