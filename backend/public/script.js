let form = document.getElementById("form");
let inputNamaBarang = document.getElementById("barang");
let inputJumlahBarang = document.getElementById("jumlah");
let inputJenisPembayaran = document.getElementById("pembayaran");

let inputTambahan = document.getElementById("input-tambahan");

// pembayaran barang
let akhir_jenisPembayaran;
inputJenisPembayaran.addEventListener("change", () => {
  akhir_jenisPembayaran = inputJenisPembayaran.value;
  inputTambahan.innerHTML = "";

  if (akhir_jenisPembayaran == "transfer" || akhir_jenisPembayaran == "qris") {
    inputTambahan.innerHTML = `
      <label for="bukti_pembayaran">Bukti : </label><br>
      <input id="bukti_pembayaran" type="file" accept="image/*" />
    `;
  }
});

// submit order
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fetch("/submitPemesanan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        // Jika respons tidak berhasil (misalnya status HTTP 4xx atau 5xx)
        // Kita bisa mencoba membaca pesan error dari server jika ada
        return response.json().then((err) => {
          throw err;
        });
      }
      return response.json(); // Mengasumsikan server mengembalikan JSON
    })
    .then((data) => {
      console.log("Success:", data);
      alert("Pemesanan berhasil disimpan!"); // Beri tahu pengguna bahwa operasi berhasil
      form.reset(); // Opsional: reset formulir setelah sukses
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        `Terjadi kesalahan saat menyimpan pemesanan: ${error.message || error}`,
      ); // Beri tahu pengguna tentang kesalahan
    });
});
