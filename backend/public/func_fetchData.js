/**
 *
 * @param {string} url
 * @param {{}} data harus sudah digunakan JSON.stringify()
 */
export async function myFetchData(url, data) {
  try {
    // kirim data
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });

    // cek apakah ada gangguan di HTTP
    if (!response.ok) {
      throw new Error(`Log HTTP: HTTP error! status: ${response.status} `);
    }

    // kelola response
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Fetch error:\n`, error);
  }
}
