const productsFlex = document.createElement("div");
productsFlex.style.display = "flex";
productsFlex.style.width = "100%";
productsFlex.style.height = "auto";

export async function getProducts() {
  const res = await fetch("../assets/products.json");
  const json = await res.json();
  return json;
}
