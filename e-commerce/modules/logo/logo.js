import { createGrid } from "../grid/grid.js";
import { createSlider } from "../slider/slider.js";
import { getProducts } from "../products/products.js";
export const logo = document.createElement("div");

const products = await getProducts();
const { sliderHeader, slider } = createSlider(products, 150);
const grid = createGrid();
logo.addEventListener("click", () => {
  if (window.location.pathname !== "/") {
    history.pushState({}, "", "/");
    root.innerHTML = "";
    root.append(sliderHeader, slider, grid);
  }
});
logo.classList.add("logo");
