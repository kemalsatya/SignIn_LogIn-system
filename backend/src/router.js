import {
  controller_renderIndex,
  controller_submitPemesann,
} from "./controller.js";
import express from "express";

const router = express.Router();

router.get("/", controller_renderIndex);
router.post("/submitPemesanan", controller_submitPemesann);
export default router;
