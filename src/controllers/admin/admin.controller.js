import { db } from "../../config/db.js";
import { getStartData, getBarber } from "../../services/1_start.Service.js";
import {
  getServiceAll,
  getServiceEdit,
  newService,
  updateBarber,
  deleteService,
  getBarberService,
  deleteBarberos,
} from "../../services/2_service.Service.js";

// Pagina admin general
export async function paneladmin(req, res) {
  try {
    res.render("./admin/admin");
  } catch (error) {
    console.error("Error consultando servicios:", error);
    res.status(500).send("Error interno del servidor");
  }
}

// Barbero pagina principal
export async function panelbarberos(req, res) {
  try {
    const { rows: barberos } = await getStartData();
    res.render("./admin/barberos", { barberos });
  } catch (error) {
    console.error("Error consultando barberos:", error);
    res.status(500).send("Error interno del servidor");
  }
}

// Pagina editar barbero
export async function panelbarberosedit(req, res) {
  const id = req.params.id;
  try {
    const { rows: barbero } = await getBarber(id);
    const { rows: servicios } = await getServiceAll();
    const { rows: asignados } = await getBarberService(id);
    const serviciosDelBarbero = asignados.map((s) => s.servicio_id);
    res.render("./admin/barberos_edit", {
      barbero,
      servicios,
      serviciosDelBarbero,
    });
  } catch (error) {
    console.error("Error consultando barberos:", error);
    res.status(500).send("Error interno del servidor");
  }
}

// Pagina añadir barbero
export async function panelbarberosadd(req, res) {
  try {
    const { rows: servicios } = await getServiceAll();

    res.render("./admin/barberos_edit", {
      barbero: null,
      servicios,
      serviciosDelBarbero: [],
      modo: "crear",
    });
  } catch (error) {
    console.error("Error consultando barberos:", error);
    res.status(500).send("Error interno del servidor");
  }
}

// Añadir Barbero
export async function addBarber(req, res) {
  try {
    const { name, skill, experience, photo } = req.body;

    // 1. Crear barbero y obtener su ID recién generado
    const insertResult = await db.query(
      `INSERT INTO barberos (name, specialty, rating, img)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, skill, experience, photo]
    );

    const newBarberId = insertResult.rows[0].id;

    // 2. Obtener servicios seleccionados en el form
    let serviciosSeleccionados = req.body["servicios[]"] || req.body.servicios;

    if (!serviciosSeleccionados) serviciosSeleccionados = [];

    if (!Array.isArray(serviciosSeleccionados)) {
      serviciosSeleccionados = [serviciosSeleccionados];
    }

    // 3. Insertar servicios seleccionados
    for (const servicioId of serviciosSeleccionados) {
      await db.query(
        `INSERT INTO barbero_servicio (barbero_id, servicio_id) VALUES ($1, $2)`,
        [newBarberId, servicioId]
      );
    }

    res.redirect("/admin/barberos"); // o lo que uses
  } catch (error) {
    console.error("Error creando barbero:", error);
    res.status(500).send("Error interno del servidor");
  }
}

// Editar Barbero
export async function editarBarbero(req, res) {
  const id = req.params.id;

  try {
    const { name, skill, experience, photo } = req.body;

    // Guardar cambios básicos del barbero
    await db.query(
      "UPDATE barberos SET name = $1, specialty = $2, rating = $3, img = $4 WHERE id = $5",
      [name, skill, experience, photo, id]
    );

    // 1. Obtener servicios seleccionados en el form
    let serviciosSeleccionados = req.body["servicios[]"] || req.body.servicios;

    // Si no seleccionó ninguno, será undefined → lo convertimos en array vacío
    if (!serviciosSeleccionados) serviciosSeleccionados = [];

    // Si selecciona solo uno, Express no crea un array → lo convertimos en uno
    if (!Array.isArray(serviciosSeleccionados)) {
      serviciosSeleccionados = [serviciosSeleccionados];
    }

    // 2. Borrar todos los servicios actuales del barbero
    await db.query("DELETE FROM barbero_servicio WHERE barbero_id = $1", [
      id,
    ]);

    // 3. Insertar los nuevos servicios
    for (const servicioId of serviciosSeleccionados) {
      await db.query(
        "INSERT INTO barbero_servicio (barbero_id, servicio_id) VALUES ($1, $2)",
        [id, servicioId]
      );
    }

    // 4. Redirigir a la lista de barberos
    res.redirect("/admin/barberos");
  } catch (error) {
    console.error("Error actualizando barbero:", error);
    res.status(500).send("Error interno del servidor");
  }
}

// Eliminar Barbero
export async function deleteBarbero(req, res) {
  const id = req.params.id;
  await deleteBarberos(id);
  res.redirect("/admin/barberos");
}

// Servicios pagina principal
export async function panelservicios(req, res) {
  try {
    const { rows: servicios } = await getServiceAll();
    res.render("./admin/servicios", { servicios });
  } catch (error) {
    console.error("Error consultando servicios:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function panelserviciosedit(req, res) {
  const id = req.params.id;
  try {
    const { rows: servicio } = await getServiceEdit(id);
    console.log(servicio);
    res.render("./admin/servicios_edit", { servicio });
  } catch (error) {
    console.error("Error consultando servicios:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function panelserviciosnew(req, res) {
  res.render("./admin/servicios_edit", {
    servicio: null,
    modo: "crear",
  });
}

export async function servicioAdd(req, res) {
  const servicio = req.body;
  await newService(servicio);
  res.redirect("/admin/servicios");
}

export async function servicioEdit(req, res) {
  const servicio = req.body;
  const id = req.params.id;
  console.log(servicio, id);
  await updateBarber(id, servicio);
  res.redirect("/admin/servicios");
}

export async function deleteServicio(req, res) {
  const id = req.params.id;
  await deleteService(id);
  res.redirect("/admin/servicios");
}
