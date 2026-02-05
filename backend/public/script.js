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

//// Password Confirmation
formPage.addEventListener("submit", (e) => {
  e.preventDefault();
  let submitData = new FormData(formPage);
  // cara kelola data
  let data = {};
  for (let [key, value] of submitData.entries()) {
    data[key] = value;
  }
  // cara kelola data yang salah
  // let data = Object.entries(submitData);
  let sendData;
  if (data["passwordConfirmation"]) {
    if (data["passwordConfirmation"] == data["password"]) {
      sendData = JSON.stringify(data);
    } else {
      alert("Konfirmasi password salah");
      formPage.reset();
    }
  }
});
