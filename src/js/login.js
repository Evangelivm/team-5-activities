import { login } from "/js/auth.mjs";
import { getParam, loadHeaderFooter } from "/js/utils.mjs";

loadHeaderFooter();
const redirect = getParam("redirect");

document.querySelector("#loginButton").addEventListener("click", (e) => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  login({ email, password }, redirect);
});