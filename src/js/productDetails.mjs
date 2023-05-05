import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cart = JSON.parse(localStorage.getItem("so-cart"));
  if (Array.isArray(cart)) {
    cart.push(product);
  } else {
    cart = [product];
  }
  setLocalStorage("so-cart", cart);

  // Get the cart icon element and add the cart-animation class to trigger the animation
  const cartIcon = document.querySelector(".cart-icon");
  cartIcon.classList.add("cart-animation");

  // After a short delay, remove the cart-animation class to stop the animation
  setTimeout(() => {
    cartIcon.classList.remove("cart-animation");
  }, 500);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Image;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}
