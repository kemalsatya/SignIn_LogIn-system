import mysql2 from "mysql2/promise";
import "dotenv/config";

const pool = mysql2.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const checkConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("database connection success");
    connection.release();
  } catch (error) {
    console.log("Log db_communication.js : connection to database error");
    throw error;
  }
};

export { pool, checkConnection };
