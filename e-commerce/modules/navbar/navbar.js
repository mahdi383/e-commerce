import { createCheckout } from "../checkout/checkout.js";
import { createDiscountPage } from "../discount-page/discount-page.js";
import { createFavs } from "../favs/favs.js";
import { getProducts } from "../products/products.js";
import { user } from "../user/user.js";

export const navbar = document.createElement("nav");
navbar.classList.add("navbar");

const favIcon = document.createElement("div");
favIcon.classList.add("nav-item");

favIcon.innerHTML =
  /*html*/
  `
FAV
<svg fill="var(--color-primary)" stroke="var(--color-primary)" width="25px" height="25px" color="var(--color-primary)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm5.085,12.121C14.656,15.069,15.918,14,17.223,14A2,2,0,0,1,19,14.823,2,2,0,0,1,20.777,14c1.3,0,2.567,1.069,2.138,3.121C22.48,19.2,19,21,19,21S15.52,19.2,15.085,17.121Z"></path></g></svg>
`;
favIcon.addEventListener("click", () => {
  if (window.location.pathname == "/favs") return;
  history.pushState({}, "", "favs");
  const favs = createFavs(user.favProducts);
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.append(favs);
});

const checkOutIcon = document.createElement("div");
checkOutIcon.classList.add("nav-item");

checkOutIcon.innerHTML =
  /*html*/
  `
CHECKOUT
<svg width="25px" height="25px" color="var(--color-primary)"viewBox="0 0 24 24" id="cart-check" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><line id="primary-upstroke" x1="10.95" y1="20.5" x2="11.05" y2="20.5" style="fill: none; stroke: var(--color-primary); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2.5;"></line><line id="primary-upstroke-2" data-name="primary-upstroke" x1="16.95" y1="20.5" x2="17.05" y2="20.5" style="fill: none; stroke: var(--color-primary); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2.5;"></line><polyline id="primary" points="12 7 14 9 18 5" style="fill: none; stroke: var(--color-primary); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline><path id="primary-2" data-name="primary" d="M3,3H5.2a1,1,0,0,1,1,.78L8.82,15.22a1,1,0,0,0,1,.78h8.42a1,1,0,0,0,1-.76L21,8" style="fill: none; stroke: var(--color-primary); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></g></svg>
`;
checkOutIcon.addEventListener("click", () => {
  if (window.location.pathname == "/checkout") return;
  history.pushState({}, "", "checkout");
  const checkout = createCheckout(user.cartProducts);
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.append(checkout);
});

const salesIcon = document.createElement("div");
salesIcon.classList.add("nav-item");
salesIcon.innerHTML =
  /*html*/
  `
SALES
<svg stroke="var(--color-primary)" width="25px" height="25px" color="var(--color-primary)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 15L15 9" stroke="var(--color-primary)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15.5 14.5C15.5 15.0523 15.0523 15.5 14.5 15.5C13.9477 15.5 13.5 15.0523 13.5 14.5C13.5 13.9477 13.9477 13.5 14.5 13.5C15.0523 13.5 15.5 13.9477 15.5 14.5Z" fill="var(--color-primary)"></path> <path d="M10.5 9.5C10.5 10.0523 10.0523 10.5 9.5 10.5C8.94772 10.5 8.5 10.0523 8.5 9.5C8.5 8.94772 8.94772 8.5 9.5 8.5C10.0523 8.5 10.5 8.94772 10.5 9.5Z" fill="var(--color-primary)"></path> <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="var(--color-primry)" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
`;

salesIcon.addEventListener("click", async () => {
  if (window.location.pathname == "/sales") return;
  history.pushState({}, "", "sales");
  const products = await getProducts();
  const discount = createDiscountPage(products.filter((p) => p.hasDiscount));
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.append(discount);
});

navbar.append(favIcon, checkOutIcon, salesIcon);

window.addEventListener("load", () => {
  if (window.location.pathname == "/checkout") {
    setTimeout(() => {
      const checkout = createCheckout(user.cartProducts);
      const root = document.getElementById("root");
      root.innerHTML = "";
      root.append(checkout);
    }, 100);
  }
});
window.addEventListener("popstate", () => {
  if (window.location.pathname == "/checkout") {
    const checkout = createCheckout(user.cartProducts);
    const root = document.getElementById("root");
    root.innerHTML = "";
    root.append(checkout);
  }
});
