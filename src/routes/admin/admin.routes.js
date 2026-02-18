import { Router } from "express";
import { requireAuth } from "../../middlewares/require.Admin.js";
import {
  paneladmin,
  panelbarberos,
  panelbarberosadd,
  panelbarberosedit,
  panelservicios,
  panelserviciosedit,
  panelserviciosnew,
  servicioAdd,
  servicioEdit,
  deleteServicio,
  addBarber,
  editarBarbero,
  deleteBarbero,
} from "../../controllers/admin/admin.controller.js";

const router = Router();

// 🔒 todo lo que esté en /admin pasa por aquí
router.use(requireAuth);

// /admin
router.get("/", paneladmin);

// /admin/barberos
router.get("/barberos", panelbarberos);
router.get("/barberos/add", panelbarberosadd);
router.get("/barberos/edit/:id", panelbarberosedit);

router.post("/barberos/agregar", addBarber);
router.post("/barberos/:id/editar", editarBarbero);
router.post("/barberos/delete/:id", deleteBarbero);

// /admin/servicios
router.get("/servicios", panelservicios);
router.get("/servicios/edit/new", panelserviciosnew);
router.get("/servicios/edit/:id", panelserviciosedit);

router.post("/servicios/agregar", servicioAdd);
router.post("/servicios/:id/editar", servicioEdit);
router.post("/servicios/delete/:id", deleteServicio);

export default router;
