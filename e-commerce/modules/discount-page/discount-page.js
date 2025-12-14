import { createSlider } from "../slider/slider.js";
import { getProducts } from "../products/products.js";
export function createDiscountPage(product) {
  const discountPage = document.createElement("div");
  const { slider, sliderHeader } = createSlider(product);
  sliderHeader.innerText = "Sales";
  slider.style.margin = "50px 0";
  discountPage.append(sliderHeader, slider);
  return discountPage;
}

window.addEventListener("load", () => {
  if (window.location.pathname === "/sales") {
    setTimeout(async () => {
      const products = await getProducts();
      const discount = createDiscountPage(
        products.filter((p) => p.hasDiscount)
      );
      const root = document.getElementById("root");
      root.innerHTML = "";
      root.append(discount);
    }, 100);
  }
});

window.addEventListener("popstate", async () => {
  if (window.location.pathname === "/sales") {
    const products = await getProducts();
    const discount = createDiscountPage(products.filter((p) => p.hasDiscount));
    const root = document.getElementById("root");
    root.innerHTML = "";
    root.append(discount);
  }
});
