import * as controllerFunction from "./controller.js";
import express from "express";

const router = express.Router();

app.get("/", controllerFunction.get_render_login_signup);
app.post("/loginsignup", controllerFunction.post_login_signup);

export default router;
