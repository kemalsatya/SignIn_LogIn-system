import * as controllerFunction from "./controller.js";
import express from "express";

const router = express.Router();

router.get("/", controllerFunction.get_render_login_signup);
router.post("/loginsignup", controllerFunction.post_login_signup);

export default router;
