import { getProducts } from "../products/products.js";
import { addToCart } from "../cart/cart.js";
import { saveUser, user } from "../user/user.js";
import { createSlider } from "../slider/slider.js";

export async function createSingleProduct(id) {
  const products = await getProducts();
  const product = products.find((p) => p.id == id);
  const exsit = user.viewedProducts.find((p) => p.id == id);
  if (!exsit) {
    user.viewedProducts.push(product);
  }

  const index = products.findIndex((p) => p.id == id);
  const singleProduct = document.createElement("div");
  singleProduct.classList.add("single-product");

  singleProduct.innerHTML =
    /*html*/
    `
  <h3 class="single-product-tilte">${product.name}</h3>
  <div class="single-product-wraper">
    <img class="single-product-image"  src='${
      "../assets/product-images/mobile-" + (index + 1) + "/" + product.images[0]
    }'/>
    <div>
      <p class="single-product-text">${product.abstract}</P>
      <p class="single-product-text">${product.description}</P>
      <div class=${
        product.hasDiscount
          ? "single-product-price-discount"
          : "single-product-price"
      }>${product.price}
      <h3 class="single-product-discount">${
        product.hasDiscount ? product.discountAmount + "%" : ""
      }</h3>
      </div>
     
      <h3 class="single-product-discount-amount">${
        product.hasDiscount
          ? (product.price * product.discountAmount) / 100
          : ""
      }</h3>
      <button id="single-product-button" class="single-product-button">ADD TO CART</button>
    </div>
  </div>
  
  `;
  const button = singleProduct.querySelector("#single-product-button");

  button.addEventListener("click", () => addToCart(id, product));
  button.addEventListener("mousedown", (e) => e.stopPropagation());

  const { slider, sliderHeader } = createSlider(
    user.viewedProducts.filter((p) => p.id != id)
  );
  sliderHeader.innerText = "You might like!";
  slider.style.marginBottom = "50px";
  singleProduct.append(sliderHeader, slider);
  saveUser(user);

  return singleProduct;
}

window.addEventListener("load", () => {
  if (window.location.pathname.includes("product-")) {
    const substr = window.location.pathname.split("-");
    const id = substr[substr.length - 1];

    setTimeout(async () => {
      const root = document.getElementById("root");
      root.innerHTML = "";

      const singleProduct = await createSingleProduct(id);
      root.append(singleProduct);
    }, 100);
  }
});
window.addEventListener("popstate", () => {
  if (window.location.pathname.includes("product-")) {
    const substr = window.location.pathname.split("-");
    const id = substr[substr.length - 1];

    setTimeout(async () => {
      const root = document.getElementById("root");
      root.innerHTML = "";

      const singleProduct = await createSingleProduct(id);
      root.append(singleProduct);
    }, 0);
  }
});
