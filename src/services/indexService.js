import { db } from "../config/db.js";

export const getPrincipalData = async () => {
  const result = await db.query("SELECT NOW()");
  return result; 
};
