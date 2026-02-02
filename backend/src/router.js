import {
  controller_renderIndex,
  controller_submitPemesann,
} from "./controller.js";
import express from "express";

const router = express.Router();

function cekData(req, res) {
  console.log(req.body);
}

router.get("/", controller_renderIndex);
router.post("/submitPemesanan", controller_submitPemesann);
export default router;
