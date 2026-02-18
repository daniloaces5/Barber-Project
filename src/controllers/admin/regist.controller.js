import { db } from "../../config/db.js";
import bcrypt from "bcrypt";

// Pagina admin general
export async function panelregist(req, res) {
  try {
    res.render("./partials/regist.ejs");
  } catch (error) {
    console.error("Error consultando servicios:", error);
    res.status(500).send("Error interno del servidor");
  }
}

export async function resregist(req, res, next) {
  const { email, password } = req.body;

  try {
    const checkUser = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.render("./partials/register.ejs", {
        mensaje: "El email ya está registrado",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hash]
    );

    req.login(newUser.rows[0], (err) => {
      if (err) return next(err);
      return res.redirect("/login");
    });

  } catch (err) {
    next(err);
  }
}

