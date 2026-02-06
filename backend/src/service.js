import { pool } from "./db_communication.js";
import "dotenv/config";

export async function post_login_account(data = {}) {
  let query, sendData;
  let { username, password } = data;
  try {
    query = `INSERT INTO ${process.env.TABLE_LOG_AKUN} (user_id, login_time)
           VALUES ((SELECT user_id FROM ${process.env.TABLE_AKUN} WHERE username = ?), ?)`;
    [sendData] = pool.execute(query, [username, password]);
    //
    if (sendData.affectedRows > 0) {
      console.log("Log: Post Login Akun Berhasil");
      return results.insertId;
    } else {
      throw new Error("Log: Post Login Akun Gagal");
    }
  } catch (error) {
    console.error(`Log: Terjadi Kesalahan Saat Query Insert:\n`, error);
    throw error;
  }
}

export async function post_signup_account(data = {}) {
  let query, sendData;
  let { username, password } = data;
  try {
    query = `INSERT INTO ${process.env.TABLE_AKUN} (username, password) VALUES (?,?)`;
    [sendData] = pool.execute(query, [username, password]);
    //
    if (sendData.affectedRows > 0) {
      console.log("Log: Post SignUp Akun Berhasil");
      return results.insertId;
    } else {
      throw new Error("Log: Post SignUp Akun Gagal");
    }
  } catch (error) {
    console.error("Log: Terjadi Kesalahan Saat Query Insert:\n", error);
    throw error;
  }
}
