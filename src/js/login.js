import { login } from "./auth.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";

loadHeaderFooter();
const redirect = getParam("redirect");

document.querySelector("#loginbutton").addEventListener("click", (e) => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    login({email,password}, redirect)
})