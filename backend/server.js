import express from "express";
import { checkConnection } from "./src/db_communication.js";
import router from "./src/router.js";

const app = express();
const PORT = 3001;

// EJS dan static data
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

// parsing data
app.use(express.json());

app.listen(PORT, async () => {
  console.log(`server running on http://localhost:${PORT}`);
  try {
    await checkConnection();
  } catch (error) {
    console.log("log Server : database tidak terhubung");
  }
});

app.use(router);
