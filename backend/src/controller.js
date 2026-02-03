// import { service_ambilDataOnLoad, service_submitPemesanan, service_ambilDataHalamanPesanan } from "./service.js";
import * as serviceFuntion from "./service.js";

// fungsi helper
async function controller_ambilDataOnLoad() {
  try {
    let data = await serviceFuntion.service_ambilDataOnLoad();
    return data;
  } catch (error) {
    console.error(
      "Log Server : Kesalahan saat ambil data dari database:",
      error,
    );
    throw error;
  }
}

export async function controller_renderIndex(res) {
  try {
    let data = await controller_ambilDataOnLoad();
    res.render("index", { data: data });
  } catch (error) {
    console.error("Log Server : Kesalahan saat merender halaman index:", error);
    res.status(500).send("Terjadi kesalahan saat memuat halaman.");
  }
}

// terima data submit pemesanan
export async function controller_submitPemesann(req, res) {
  let values = Object.values(req.body);
  let checkValues = values.every((value) => {
    return value !== undefined && value !== null && value !== "";
  });
  // console.log(req.body);
  try {
    let sendData = await serviceFuntion.service_submitPemesanan(req.body);
  } catch (error) {
    console.log("Log: Ada error saat di service");
  }
}

export async function controller_ambilDataHalamanPesanan(res) {
  try {
    let dataPesanan = await serviceFuntion.service_ambilDataHalamanPesanan();
    res.render("halamanPemesanan", dataPesanan);
  } catch (error) {
    console.error(error.message);
  }
}
