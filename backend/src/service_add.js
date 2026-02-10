import { pool } from "./db_communication.js";
import "dotenv/config";

// cek apakah username sudah terdaftar
export async function checkUserExist(username = String) {
  // cek parameter
  if (typeof username != "string") {
    throw new Error("parameter bukan sebuah string");
  }

  // query
  let result;
  try {
    let query = `SELECT * FROM ${process.env.TABLE_AKUN} WHERE username = (?)`;
    [result] = await pool.execute(query, [username]);
    if (!result) {
      throw new Error("Kesalahan saat query check user");
    }
  } catch (error) {
    console.error("error saat cek akun:\n", error);
    throw error;
  }

  // cek dan kirim hasil
  return result[0];
}
