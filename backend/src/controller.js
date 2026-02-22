import * as serviceFunction from "./service.js";

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
  if (!req.body) {
    throw new Error("request kosong");
  }
  try {
    if (option === "login") {
      sendData = await serviceFunction.post_login_account(data);
      if (sendData) {
        req.session.username = username;
        req.session.isLoggedIn = true;
        res.send({ output: "data login berhasil disimpan" });
      }
    } else if (option === "signup") {
      sendData = await serviceFunction.post_signup_account(data);
      if (sendData) {
        res.send({ output: "data signup berhasil disimpan" });
      }
    }
  } catch (error) {
    res.send({ output: `${error.message}` });
  }
}
