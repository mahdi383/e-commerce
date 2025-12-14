import { createSlider } from "../slider/slider.js";
import { user } from "../user/user.js";

export function createFavs(products) {
  const favs = document.createElement("div");
  const { slider, sliderHeader } = createSlider(products);
  slider.style.margin = "50px 0";
  sliderHeader.innerText = "Favs";
  favs.append(sliderHeader, slider);
  return favs;
}

window.addEventListener("load", () => {
  if (window.location.pathname === "/favs") {
    setTimeout(async () => {
      const favs = createFavs(user.favProducts);
      const root = document.getElementById("root");
      root.innerHTML = "";
      root.append(favs);
    }, 100);
  }
});
window.addEventListener("popstate", (e) => {
  if (window.location.pathname == "/favs") {
    setTimeout(async () => {
      const favs = createFavs(user.favProducts);
      const root = document.getElementById("root");
      root.innerHTML = "";
      root.append(favs);
    }, 0);
  }
});
