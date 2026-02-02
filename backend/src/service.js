import { pool } from "./db_communication.js";

// ambil semua data (GET)
export async function service_ambilDataOnLoad() {
  // ambil data semua nama barang, pembayaran
  try {
    const queryBarang = "SELECT id_barang, nama_barang FROM barang";
    const queryPembayaran = "SELECT id_pembayaran, tipe FROM pembayaran";

    let [requestDataBarang_rows] = await pool.execute(queryBarang);
    let [requestDataPembayaran_rows] = await pool.execute(queryPembayaran);

    if (
      requestDataBarang_rows.length === 0 &&
      requestDataPembayaran_rows.length === 0
    ) {
      console.log(
        "log : Tidak ada data barang dan pembayaran yang ditemukan di database.",
      );
      throw new Error("log : kesalahan saat query");
    } else if (requestDataBarang_rows.length === 0) {
      console.log("log : Tidak ada data barang yang ditemukan di database.");
      throw new Error("log : kesalahan saat query");
    } else if (requestDataPembayaran_rows.length === 0) {
      console.log(
        "log : Tidak ada data pembayaran yang ditemukan di database.",
      );
      throw new Error("log : kesalahan saat query");
    }

    return {
      requestDataBarang: requestDataBarang_rows,
      requestDataPembayaran: requestDataPembayaran_rows,
    };
  } catch (error) {
    console.log(`log : kesalahan saat query, `, error);
    throw new Error("log : kesalahan saat query");
  }
}
// kirim data
export async function service_submitPemesanan(data = {}) {
  let { barang, jumlah, pembayaran } = data;
  let query = `INSERT INTO pemesanan (id_barang, jumlah_barang, id_pembayaran)
    VALUES(?, ?, ?)`;
  // barang = Number(barang);
  // jumlah = Number(jumlah);
  // pembayaran = Number(pembayaran);

  try {
    let [results] = await pool.execute(query, [barang, jumlah, pembayaran]);
    console.log(results);
  } catch (error) {
    console.error("Log: Ada kesalahan pada saat INSERT data:", error); // Gunakan console.error dan cetak objek error
    throw new Error("Log: Kesalahan saat menyimpan data pemesanan"); // Berikan pesan error yang lebih deskriptif
  }
}
