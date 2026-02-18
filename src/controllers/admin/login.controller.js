import passport from "../../config/passport.config.js";

// Página login
export function panelLogin(req, res) {
  res.render("./partials/login.ejs");
}

// Procesar login
export function resLogin(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    console.log("USER:", user);

    if (err) return next(err);

    if (!user) {
      console.log("No user found");
      return res.send("Credenciales incorrectas");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      console.log("Login correcto");
      return res.redirect("/admin");
    });

  })(req, res, next);
}
