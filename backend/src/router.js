import * as controllerFunction from "./controller.js";
import express from "express";

const router = express.Router();

router.get("/", controllerFunction.controller_renderIndex);
router.post("/submitPemesanan", controllerFunction.controller_submitPemesann);
router.get(
  "/halamanPemesanan",
  controllerFunction.controller_ambilDataHalamanPesanan,
);
export default router;
