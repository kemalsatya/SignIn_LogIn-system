let formPage = document.querySelector(".form");

//// alternate condition
let optionWrapper = document.querySelector(".option-wrapper");
let optionRadios = optionWrapper.querySelectorAll('input[type="radio"]');
let inputAffected = document.getElementById("input-affected");
let buttonAffected = document.getElementById("button-affected");

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

//// funsi post data
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
      alert("Konfirmasi password salah");
    }
  } else if (data["option"] == "login") {
    sendData = JSON.stringify(data);
  }

  if (!sendData) {
    alert("data kosong / tidak bisa dikirim");
    return;
  }
  formPage.reset();
  
  // kirim data
  myFetchData("http://localhost:3001/loginsignup", sendData)
    .then((data) => {
      console.log("success: ", data);
    })
    .catch((error) => {
      console.error(error);
    });
});
