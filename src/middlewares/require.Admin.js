export function requireAdmin(req, res, next) {
  // 1️⃣ Existe sesión?
  if (!req.session) {
    return res.redirect("/login");
  }

  // 2️⃣ Está autenticado como admin?
  if (req.session.isAdmin === true) {
    return next(); // ✅ deja pasar
  }

  // 3️⃣ No autorizado
  return res.redirect("/login");
}
