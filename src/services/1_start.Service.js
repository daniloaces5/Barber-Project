import { db } from "../config/db.js";

export const getStartData = async () => {
  const result = await db.query("SELECT * FROM barberos");
  return result;
};

export async function getBarber(id) {
  const result = await db.query("SELECT * FROM barberos WHERE id = $1", [
    id,
  ]);
  return result;
}
