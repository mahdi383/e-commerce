import { createCard } from "../card/card.js";
import { createCheckout } from "../checkout/checkout.js";
import { saveUser, user, getDiscount, getTotal } from "../user/user.js";
import { mainHeader } from "../main-header/main-header.js";
export const cart = document.createElement("div");
createCart(user.cartProducts);
export const cartIcon = document.createElement("div");
cartIcon.classList.add("cart-icon");
cartIcon.addEventListener("mousedown", (e) => {
  e.stopPropagation();

  cart.style.opacity = 1;
  cart.style.pointerEvents = "all";
});

window.addEventListener("mousedown", (e) => {
  cart.style.opacity = 0;
  cart.style.pointerEvents = "none";
});

cartIcon.innerHTML =
  /*html*/
  `
<svg stroke="var(--color-primary)"  width="25px" height="25px" color="var(--color-primary)"  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`;

function createCart(products) {
  cart.innerHTML = "";
  cart.style.opacity = 0;
  cart.style.pointerEvents = "all";
  cart.classList.add("cart-menu");
  cart.innerHTML =
    /*html*/
    `
    
        <div class="cart-product-list">
        ${renderCartProducts(products)}
        </div>
        <div class="cart-price-wrapper">
            <div class="cart-price">
            Total:
            <div id="cart-total" class="card-price-total"> ${getTotal()} $</div>
            With Discount:
            <div id="cart-discount" class="card-discount-total"> ${getDiscount()} $</div>
            </div>
            <button style="cursor:pointer;" id="cart-button" class="cart-button">BUY</button>
        </div>
   
      
    `;

  const button = cart.querySelector("#cart-button");
  cart.addEventListener("click", (e) => {
    if (e.target.id != "cart-button") return;
    if (window.location.pathname == "/checkout") return;
    history.pushState({}, "", "checkout");
    const checkout = createCheckout(user.cartProducts);
    const root = document.getElementById("root");
    root.innerHTML = "";
    root.append(checkout);
  });

  cart.addEventListener("mousedown", (e) => e.stopPropagation());
  return cart;
}

window.addEventListener("click", (e) => {
  if (e.target.id == "delete-cart-item") {
    e.target.parentElement.remove();
    const index = user.cartProducts.findIndex(
      (p) => p.id == e.target.dataset.product
    );

    user.cartProducts.splice(index, 1);
    const totalDiv = document.querySelector("#cart-total");
    totalDiv.innerText = getTotal() + " $";
    const discountDiv = document.querySelector("#cart-discount");
    discountDiv.innerText = getDiscount() + " $";
    saveUser(user);
  }
});
export function renderCartProducts(products) {
  return products.map((p, index) => {
    const card = createCard(p, index);
    card.dataset.product = p.id;
    card.style.height = "50px";
    card.style.flexDirection = "row";
    card.querySelectorAll("img").forEach((img) => (img.style.width = "50px"));
    card.querySelectorAll("img").forEach((img) => (img.style.height = "50px"));
    card.style.position = "relative";
    card.querySelector(".product-header").style.margin = "0";
    card.querySelector(".product-header").style.width = "fit-content";
    card.querySelector(".product-header").style.marginLeft = "auto";
    card.querySelector(".product-abstract").style.display = "none";
    card.style.width = "235px";
    const deleteBtn = document.createElement("div");
    deleteBtn.id = "delete-cart-item";
    deleteBtn.dataset.product = p.id;
    deleteBtn.innerHTML =
      /*html*/
      `
      <svg style="pointer-events:none;" width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="var(--color-danger)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="var(--color-danger)" d="M352 480h320a32 32 0 1 1 0 64H352a32 32 0 0 1 0-64z"></path><path fill="var(--color-danger)" d="M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768zm0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896z"></path></g></svg>
      `;
    deleteBtn.style.position = "absolute";
    deleteBtn.style.right = "5px";
    deleteBtn.style.bottom = "5px";
    deleteBtn.style.cursor = "pointer";
    card.append(deleteBtn);
    card.querySelectorAll("button").forEach((b) => (b.style.display = "none"));
    const count = document.createElement("div");
    count.style.width = "50px";
    count.style.height = "10px";
    count.style.fontSize = "small";
    count.style.color = "var(--color-danger)";

    count.innerText = `${p.count} X`;
    count.style.position = "absolute";
    count.style.right = "78px";
    count.style.bottom = "48px";
    count.id = "product-count";
    card.append(count);
    return card.outerHTML;
  });
}
export function addToCart(id, product) {
  cart.style.opacity = 1;
  const exist = user.cartProducts.find((p) => p.id == id);
  console.log(cart);
  if (exist) {
    const targetCard = cart.querySelector(`[data-product='${id}']`);
    const count = targetCard.querySelector("#product-count");
    count.innerText = ++exist.count + " X";
    const totalDiv = cart.querySelector("#cart-total");
    totalDiv.innerText = getTotal() + " $";
    const discountDiv = cart.querySelector("#cart-discount");
    discountDiv.innerText = getDiscount() + " $";
    saveUser(user);
    return;
  }
  user.cartProducts.push(product);

  const newCart = createCart(user.cartProducts);

  mainHeader.append(newCart);
  newCart.style.opacity = 1;
  const totalDiv = newCart.querySelector("#cart-total");
  totalDiv.innerText = getTotal() + " $";
  const discountDiv = newCart.querySelector("#cart-discount");
  discountDiv.innerText = getDiscount() + " $";

  saveUser(user);
}
