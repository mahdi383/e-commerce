import { createCard } from "../card/card.js";
import { getProducts } from "../products/products.js";
let currentFilters = [];
let filteredProducts;
export function createSearchResults(products, initialFilters) {
  const filters = document.createElement("div");
  filters.classList.add("search-results-filters");
  const results = document.createElement("div");
  results.classList.add("search-results-results");
  const searchResults = document.createElement("div");
  searchResults.classList.add("search-results");

  filters.innerHTML =
    /*html*/
    `
    <div class="filter-item">
        <label>
            Search
            <input type="text"  data-filter="abstract" id="search-input"/>
        </label>
    </div>
    <div class="filter-item">
        <label>
        Apple
            <input type="radio" name="brand" value="Apple" data-filter="brand" id="brand-input"/>
        </label>
        <label>
        Samsung
            <input type="radio" name="brand" value="Samsung" data-filter="brand" id="brand-input"/>
        </label>
        <label>
        Google
            <input type="radio" name="brand" value="Google" data-filter="brand" id="brand-input"/>
        </label>
    </div>
    <div class="filter-item">
        <label>
        4GB RAM
            <input type="radio" name="RAM" value="4GB" data-filter="RAM" id="RAM-input"/>
        </label>
        <label>
        8GB RAM
            <input type="radio" name="RAM" value="8GB" data-filter="RAM" id="RAM-input"/>
        </label>
        <label>
        12GB RAM
            <input type="radio" name="RAM" value="12GB" data-filter="RAM" id="RAM-input"/>
        </label>
    </div>
    <div class="filter-item">
        <label>
        64GB Memory
            <input type="radio" name="memory" value="64GB" data-filter="memory" id="memory-input"/>
        </label>
        <label>
        128GB Memory
            <input type="radio" name="memory" value="128GB" data-filter="memory" id="memory-input"/>
        </label>
        <label>
        256GB Memory
            <input type="radio" name="memory" value="256GB" data-filter="memory" id="memory-input"/>
        </label>
    </div>
    <button>RESET</button>
    
    `;

  const search = filters.querySelector("input[type='text']");
  search.addEventListener("change", (e) => {
    const exist = currentFilters.find((f) => f.name === "abstract");

    if (exist) {
      exist.value = e.target.value;
    } else {
      currentFilters.push({
        name: "abstract",
        value: e.target.value,
      });
    }
    filteredProducts = filterProducts(products, currentFilters);
    renderProducts(filteredProducts, results);
  });

  const radios = filters.querySelectorAll("input[type='radio']");
  radios.forEach((r) => {
    r.addEventListener("change", (e) => {
      const exist = currentFilters.find((f) => f.name === e.target.name);
      if (exist) {
        exist.value = e.target.value;
      } else {
        currentFilters.push({
          name: e.target.name,
          value: e.target.value,
        });
      }
      filteredProducts = filterProducts(products, currentFilters);
      renderProducts(filteredProducts, results);
    });
  });
  const reset = filters.querySelector("button");
  reset.addEventListener("click", () => {
    filteredProducts = products;
    currentFilters = [];
    renderProducts(products, results);
    radios.forEach((r) => (r.checked = false));
    search.value = "";
  });
  if (initialFilters && initialFilters.length !== 0) {
    const initialProducts = filterProducts(products, initialFilters);
    renderProducts(initialProducts, results);
  } else {
    renderProducts(products, results);
  }

  searchResults.append(results, filters);
  return searchResults;
}
function renderProducts(products, results) {
  if (products) {
    results.innerHTML = "";
    products.forEach((p, index) => {
      const card = createCard(p, index);
      results.append(card);
    });
  }
}

function filterProducts(products, currentFilters) {
  currentFilters.forEach((f) => {
    products = products.filter((p) =>
      p[f.name].toLowerCase().includes(f.value.toLowerCase())
    );
  });
  return products;
}

window.addEventListener("load", () => {
  if (window.location.pathname.includes("brand-")) {
    console.log("hello");
    setTimeout(async () => {
      const substr = window.location.pathname.split("-");
      const brand = substr[substr.length - 1];
      console.log(brand);
      const root = document.getElementById("root");
      root.innerHTML = "";
      const products = await getProducts();
      const searchResults = createSearchResults(products, [
        { name: "brand", value: brand },
      ]);
      root.append(searchResults);
    }, 100);
  }
  if (window.location.pathname == "/buynow") {
    setTimeout(async () => {
      const root = document.getElementById("root");
      root.innerHTML = "";
      const products = await getProducts();
      const searchResults = createSearchResults(products);
      root.append(searchResults);
    }, 100);
  }
});

window.addEventListener("popstate", () => {
  if (window.location.pathname.includes("brand-")) {
    setTimeout(async () => {
      const substr = window.location.pathname.split("-");
      const brand = substr[substr.length - 1];
      const root = document.getElementById("root");
      root.innerHTML = "";
      const products = await getProducts();
      const searchResults = createSearchResults(products, [
        { name: "brand", value: brand },
      ]);
      root.append(searchResults);
    }, 0);
  }
  if (window.location.pathname == "/buynow") {
    setTimeout(async () => {
      const root = document.getElementById("root");
      root.innerHTML = "";
      const products = await getProducts();
      const searchResults = createSearchResults(products);
      root.append(searchResults);
    }, 0);
  }
});
