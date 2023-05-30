import {getProductsByCategory} from "./externalServices.mjs";
import {renderListWithTemplate} from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`
} 

export default async function productList(selector, category) {
    // get the element we will insert the list into from the selector
    const elem = document.querySelector(selector);
    // get the list of products
    const products = (await getProductsByCategory(category));
    const indexOne = [0,1,3,5]
    const selPr = products.filter((_,index) => indexOne.includes(index));
    console.log(products);
    // render out the product list to the element
    //i change to products for receive all the list
    renderListWithTemplate(productCardTemplate, elem, products);
    //change the name
    document.querySelector(".title").innerHTML = category;
}

function renderList(list, el) {
    const htmlStrings =  list.map(productCardTemplate);
    el.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
}