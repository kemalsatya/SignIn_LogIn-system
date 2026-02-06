import * as serviceFunction from "./service.js";

// 0 : Login
// 1 : Sign Up

export async function get_render_login_signup(req, res) {
  try {
    res.render("index");
  } catch (error) {
    console.log(`Error render login/Signup page:\n`, error);
  }
}

export async function post_login_signup(req, res) {
  let { option, username, password } = req.body;
  let data = { username, password };
  let sendData;
  try {
    if (option === "login") {
      sendData = serviceFunction.post_login_account(data);
    } else if (option === "signup") {
      sendData = serviceFunction.post_signup_account(data);
    }
    res.send({ output: "data berhasil disimpan" });
  } catch (error) {
    console.log(error.message);
  }
}
