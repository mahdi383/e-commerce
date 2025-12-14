import { createSlider } from "../slider/slider.js";
import { getDiscount, getTotal } from "../user/user.js";

export function createCheckout(products) {
  const checkoutEl = document.createElement("div");
  const header = document.createElement("h3");
  header.innerText = "Checkout";

  checkoutEl.classList.add("checkout");
  const { slider } = createSlider(products, 150, true, false);
  const totalEl = document.createElement("div");
  totalEl.classList.add("total");
  totalEl.innerText = "Total: " + getTotal() + " $";
  const discountEl = document.createElement("div");
  discountEl.innerText = getDiscount() + " $";
  discountEl.classList.add("discount");
  const button = document.createElement("button");
  button.classList.add("checkout-button");
  button.innerText = "PAY";
  checkoutEl.append(header, slider, totalEl, discountEl, button);
  return checkoutEl;
}
