import { burgerMenu } from "./modules/burger/burger.js";
import { mainHeader } from "./modules/main-header/main-header.js";
import { banner } from "./modules/banner/banner.js";
import { getProducts } from "./modules/products/products.js";
import { createSlider } from "./modules/slider/slider.js";
import { createGrid } from "./modules/grid/grid.js";
import { mainFooter } from "./modules/main-footer/main-footer.js";
import { loadUser } from "./modules/user/user.js";

loadUser();

const products = await getProducts();
const { sliderHeader, slider } = createSlider(products, 150);

const grid = createGrid();

document.getElementById("main-header").append(mainHeader, burgerMenu, banner);
document.getElementById("root").append(sliderHeader, slider, grid);
document.getElementById("main-footer").append(mainFooter);

window.addEventListener("popstate", () => {
  if (window.location.pathname == "/") {
    const root = document.getElementById("root");
    root.innerHTML = "";
    root.append(sliderHeader, slider, grid);
  }
});
