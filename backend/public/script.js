let formPage = document.querySelector(".form");

//// alternate condition
let optionWrapper = document.querySelector(".option-wrapper");
let optionRadios = optionWrapper.querySelectorAll('input[type="radio"]');
let inputAffected = document.getElementById("input-affected");
let buttonAffected = document.getElementById("button-affected");

let toastNotification = document.getElementById("toast-notification");
let toastMessage = document.getElementById("toast-message");

// toast notification
function showToast(message, type = "default") {
  toastMessage.textContent = message;
  toastNotification.classList.remove(
    "toast-hidden",
    "toast-error",
    "toast-success",
  );
  toastNotification.classList.add("toast-visible");

  if (type === "error" || type === "salah") {
    toastNotification.classList.add("toast-error");
  } else if (type === "success") {
    toastNotification.classList.add("toast-success");
  }

  setTimeout(() => {
    toastNotification.classList.remove(
      "toast-visible",
      "toast-error",
      "toast-success",
    );
    toastNotification.classList.add("toast-hidden");
  }, 3000);
}

// signup condition
let optionChecked;
optionRadios.forEach((input) => {
  input.addEventListener("click", (e) => {
    optionChecked = e.target;
    if (optionChecked.value === "signup") {
      inputAffected.innerHTML = `
        <input
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
            class="main-input"
            placeholder="Password Confirmation"
        />
        `;
      // other affected condition
      buttonAffected.value = `Sign Up`;
    } else if (optionChecked.value === "login") {
      inputAffected.innerHTML = ``;
      buttonAffected.value = `Login`;
    }
  });
});

//// fungsi post data
async function myFetchData(url, data) {
  try {
    // kirim data
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    // cek apakah ada gangguan di HTTP
    if (!response.ok) {
      throw new Error(`Log HTTP: HTTP error! status: ${response.status} `);
    }

    // kelola response
    const result = await response.json();
    return result;
    console.log(result);
  } catch (error) {
    console.error(`Fetch error:\n`, error);
  }
}

//// Password Confirmation & Send Data
formPage.addEventListener("submit", (e) => {
  e.preventDefault();
  let submitData = new FormData(formPage);

  let data = Object.fromEntries(submitData);
  let sendData;

  if (data["option"] == "signup") {
    if (data["passwordConfirmation"] == data["password"]) {
      sendData = JSON.stringify(data);
    } else {
      showToast("Konfirmasi password salah", "error");
      formPage.reset();
      return;
    }
  } else if (data["option"] == "login") {
    sendData = JSON.stringify(data);
  }

  if (!sendData) {
    showToast("data kosong / tidak bisa dikirim", "error");
    return;
  }
  formPage.reset();

  // kirim data
  myFetchData("http://localhost:3001/", sendData)
    .then((responseData) => {
      console.log("success: ", responseData);
      if (responseData.output.includes("berhasil")) {
        showToast(responseData.output, "success");
      } else if (responseData.output.includes("Salah")) {
        showToast(responseData.output, "error");
      } else if (responseData.output.includes("Sudah Ada")) {
        showToast(responseData.output, "error");
      } else if (responseData.output.includes("Belum Ada")) {
        showToast(responseData.output, "error");
      }
    })
    .catch((error) => {
      console.error(error);
      showToast(`Terjadi kesalahan: ${error.message}`, "error");
    });
});
