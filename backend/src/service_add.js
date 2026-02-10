import { pool } from "./db_communication.js";

// cek apakah username sudah terdaftar
export async function checkUsernameExist(username = String) {
  // cek parameter
  if (typeof username != "string") {
    throw new Error("parameter bukan sebuah string");
  }

  // query
  try {
    let query = `SELECT user_id, username FROM TABLE_AKUN WHERE username = (?)`;
    let [result] = await pool.execute(query, username);
  } catch (error) {
    console.error("error saat cek username:\n", error);
    throw error;
  }

  // cek dan kirim hasil
  return result.length > 0 ? true : false;
}
