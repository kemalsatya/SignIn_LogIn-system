import mysql2 from "mysql2/promise";

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fullstack1",
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
