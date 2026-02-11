import express from "express";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectLivereload from "connect-livereload";
import livereload from "livereload";
import indexRoutes from "./routes/index/index.routes.js";
import userRoutes from "./routes/user_reservas/1_start.routes.js";
import mis_reservasRoutes from "./routes/mis_reservas/mis_reservas.routes.js";
import { requireAdmin } from "./middlewares/require.Admin.js";
import adminRoutes from "./routes/admin/admin.routes.js";
import loginRoutes from "./routes/admin/login.routes.js";
import bcrypt from "bcrypt"
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";


dotenv.config();
const app = express();

// Revisar lo siguiente
// app.use(helmet());
// app.disable("x-powered-by");
// Hasta aqui

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // JS no accede
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 📍 Paths absolutos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔄 LiveReload solo en desarrollo
if (process.env.NODE_ENV === "development") {
  const liveReloadServer = livereload.createServer({
    exts: ["ejs", "css", "js"],
    delay: 100,
  });
  
  liveReloadServer.watch([
    path.join(__dirname, "views"),
    path.join(__dirname, "public"),
  ]);
  
  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
  
  app.use(connectLivereload());
}


// ⚙️ Configuración de Express
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// 🚏 Rutas principales
app.use("/", indexRoutes);
app.use("/", userRoutes);
app.use("/mis_reservas", mis_reservasRoutes);
app.use("/login", loginRoutes);
app.use("/admin", requireAdmin, adminRoutes);

// ⚠️ Error 404
app.use((req, res) => {
  res.status(404).render("index/404", { title: "Página no encontrada" });
});

export default app;
