import { pool } from "./db_communication.js";
import * as addFunc from "./service_add.js";
import "dotenv/config";
import * as z from "zod";

const Account = z.object({
  username: z
    .string({ message: "username is not a string!" })
    .min(1, "username tidak boleh kosong!"),
  password: z.string({ message: "password is not a string!" }),
});

export async function post_login_account(data = {}) {
  let query, sendData;

  const result = Account.safeParse(data);
  if (!result.success) {
    let errors = result.error.issues.map((i) => i.message);
    // throw errors;
    throw new Error(errors);
  }

  let { username, password } = data;
  let check;
  try {
    check = await addFunc.checkUserExist(username);
    if (!check) {
      throw new Error("Akun Belum Ada, Silahkan Membuat Akun Terlebih Dahulu");
    } else if (check.password !== password) {
      throw new Error("Password Anda Salah");
    }
  } catch (error) {
    throw error;
  }

  try {
    query = `INSERT INTO ${process.env.TABLE_LOG_AKUN} (user_id)
           VALUES ((SELECT user_id FROM ${process.env.TABLE_AKUN} WHERE username = ?))`;
    [sendData] = await pool.execute(query, [username]);
    //
    if (sendData.affectedRows > 0) {
      return true;
    } else {
      throw new Error("Log: Post Login Akun Gagal");
    }
  } catch (error) {
    console.error(`Log: Terjadi Kesalahan Saat Query Insert:\n`, error);
    throw error;
  }
}

export async function post_signup_account(data = {}) {
  const result = Account.safeParse(data);
  if (!result.success) {
    let errors = result.error.issues.map((i) => i.message);
    throw new Error(errors);
  }

  let { username, password } = data;

  try {
    let check = await addFunc.checkUserExist(username);
    if (check) {
      throw new Error("Username Sudah Ada");
    }
  } catch (error) {
    throw error;
  }

  let query, sendData;
  try {
    query = `INSERT INTO ${process.env.TABLE_AKUN} (username, password) VALUES (?,?)`;
    [sendData] = await pool.execute(query, [username, password]);

    if (sendData.affectedRows > 0) {
      return true;
    } else {
      throw new Error("Log: Post SignUp Akun Gagal");
    }
  } catch (error) {
    console.error("Log: Terjadi Kesalahan Saat Query Insert:\n", error);
    throw error;
  }
}
