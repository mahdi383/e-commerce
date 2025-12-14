import { getProducts } from "../products/products.js";
import { createSearchResults } from "../search-results/search-results.js";

export const banner = document.createElement("div");

banner.classList.add("banner");
const bannerButton = document.createElement("button");

bannerButton.innerHTML =
  /*html*/
  `
<svg width="40px" height="40px" fill="var(--color-primary)" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M694.018 926.244c-27.296 18.796-27.3 49.269 0 68.067l509.836 351.074c27.296 18.797 49.424 7.18 49.424-25.959V601.13c0-33.133-22.125-44.757-49.424-25.959L694.018 926.244Z" fill-rule="evenodd"></path> </g></svg>
BUY NOW!
`;
bannerButton.onclick = async () => {
  if (window.location.pathname !== "/buynow") {
    history.pushState({}, "", "buynow");
    const root = document.getElementById("root");
    root.innerHTML = "";
    const products = await getProducts();
    const searchResults = createSearchResults(products);
    root.append(searchResults);
  }
};
bannerButton.classList.add("banner-button");
banner.append(bannerButton);
