// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(
        this.outputSelector + " #cartTotal"
      );
      const itemNumElement = document.querySelector(
        this.outputSelector + " #num-items"
      );
      itemNumElement.innerText = this.list.length;
      //the total of the items in cart
      const amounts = this.list.map((item) => item.FinalPrice);
      this.itemTotal = amounts.reduce((sum, item) => sum + item);
      summaryElement.innerText = "$" + this.itemTotal;
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax");
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innerText = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  },
  checkout: async function (form) {
    // build the data object from the calculated fields, the items in the cart, and the information entered into the form
    const json = formDataToJSON(form);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    // call the checkout method in our externalServices module and send it our data object.
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  },
  
}
export default checkoutProcess;


