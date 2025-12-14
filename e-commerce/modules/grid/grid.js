import { getProducts } from "../products/products.js";
import { createSearchResults } from "../search-results/search-results.js";

export function createGrid() {
  const grid = document.createElement("div");
  grid.classList.add("grid");
  const samsungBrand = document.createElement("div");
  samsungBrand.classList.add("grid-samsung");
  samsungBrand.innerHTML =
    /*html*/
    `
     <h3 class="grid-text">samsung</h3>
    `;
  const googleBrand = document.createElement("div");
  googleBrand.innerHTML =
    /*html*/
    `
     <h3 class="grid-text">GOOGLE</h3>
    `;
  googleBrand.classList.add("grid-google");
  const appleBrand = document.createElement("div");
  appleBrand.classList.add("grid-apple");
  appleBrand.innerHTML =
    /*html*/
    `
     <h3 class="grid-text">APPLE</h3>
    `;

  samsungBrand.onclick = async (e) => {
    window.history.pushState({}, "", "brand-samsung");
    const root = document.getElementById("root");
    root.innerHTML = "";
    const products = await getProducts();
    const searchResults = createSearchResults(products, [
      { name: "brand", value: "samsung" },
    ]);
    root.append(searchResults);
  };
  googleBrand.onclick = async (e) => {
    window.history.pushState({}, "", "brand-google");
    const root = document.getElementById("root");
    root.innerHTML = "";
    const products = await getProducts();
    const searchResults = createSearchResults(products, [
      { name: "brand", value: "google" },
    ]);
    root.append(searchResults);
  };
  appleBrand.onclick = async (e) => {
    window.history.pushState({}, "", "brand-apple");
    const root = document.getElementById("root");
    root.innerHTML = "";
    const products = await getProducts();
    const searchResults = createSearchResults(products, [
      { name: "brand", value: "apple" },
    ]);
    root.append(searchResults);
  };
  window.onload = (e) => {};
  grid.append(samsungBrand, googleBrand, appleBrand);
  return grid;
}
