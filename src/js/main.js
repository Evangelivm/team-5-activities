import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import Alert from "./alert.js";


const alertInstance = new Alert();
alertInstance.loadAlerts();
alertInstance.createAlertSection();
loadHeaderFooter();

productList(".product-list", "tents");