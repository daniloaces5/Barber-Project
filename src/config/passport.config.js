import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import { db } from "../config/db.js";

passport.use(
  new Strategy(async (username, password, cb) => {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1", [
        username,
      ]);

      if (result.rows.length === 0) {
        return cb(null, false);
      }

      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return cb(null, false);
      }

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }),
);

// ===== SERIALIZE =====
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// ===== DESERIALIZE =====
passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    cb(null, result.rows[0]);
  } catch (err) {
    cb(err);
  }
});

export default passport