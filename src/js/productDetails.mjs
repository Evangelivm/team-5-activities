import { setLocalStorage } from './utils.js';
import { findProductById } from "./productData.mjs";

let product = null;

//product details
export default async function productDetails(productId){
    product = await findProductById(productId);
    renderProductDetails();
    document
    .getElementById("addToCart")
    .addEventListener("click", addToCart);
}

//addToCart
function addToCart(){
    setLocalStorage("so-cart",product);
}

//renderproductdetails
function renderProductDetails(){
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText = product.NameWithoutBrand;
    //for images
    document.querySelector("#productImage").src = product.Image;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
    document.querySelector("#productColorName").innerText = product.Colors(0).ColorName;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
}