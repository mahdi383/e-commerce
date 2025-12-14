import { createSingleProduct } from "../single-product/single-product.js";
import { saveUser, user } from "../user/user.js";

export function createCard(product, index, hasCount = false, hasButton = true) {
  const card = document.createElement("div");

  card.classList.add("product-card");
  const imageFront = document.createElement("img");
  card.addEventListener("mouseenter", () => {
    imageFront.style.opacity = 0;
  });
  card.addEventListener("mouseleave", () => {
    imageFront.style.opacity = 1;
  });

  imageFront.classList.add("product-image");
  imageFront.src =
    "../assets/product-images/mobile-" + (index + 1) + "/" + product.images[0];
  const imageBack = document.createElement("img");
  imageBack.classList.add("product-image");
  imageBack.src =
    "../assets/product-images/mobile-" + (index + 1) + "/" + product.images[1];
  const header = document.createElement("h5");
  header.innerText = product.name;
  header.classList.add("product-header");
  const abstract = document.createElement("div");
  abstract.classList.add("product-abstract");
  abstract.innerText = product.abstract;
  const button = document.createElement("button");
  button.addEventListener("click", async () => {
    history.pushState({}, "", "product-" + product.id);
    const root = document.getElementById("root");
    root.innerHTML = "";

    const singleProduct = await createSingleProduct(product.id);
    root.append(singleProduct);
  });
  button.classList.add("product-button");
  button.innerText = "SELECT";
  imageBack.classList.add("product-image-back");
  const countEl = document.createElement("div");
  countEl.innerText = product.count + " X";
  countEl.style.color = "var(--color-danger)";
  if (hasCount) card.append(countEl);
  card.append(imageFront, imageBack, header, abstract);
  const fav = document.createElement("div");
  const favon = document.createElement("div");
  favon.classList.add("card-favon");
  const favoff = document.createElement("div");
  favoff.classList.add("card-favoff");
  favoff.innerHTML =
    /*html*/
    `
    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M12 5.50098L14 7.5004" stroke="var(--color-secondary)" stroke-width="1.5" stroke-linecap="round"></path> <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z" fill="var(--color-secondary)"></path> </g></svg>
    `;
  favon.innerHTML =
    /*html*/
    `
    <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="var(--color-secondary)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.10627 18.2468C5.29819 16.0833 2 13.5422 2 9.1371C2 4.27416 7.50016 0.825464 12 5.50063L14 7.49928C14.2929 7.79212 14.7678 7.79203 15.0607 7.49908C15.3535 7.20614 15.3534 6.73127 15.0605 6.43843L13.1285 4.50712C17.3685 1.40309 22 4.67465 22 9.1371C22 13.5422 18.7018 16.0833 15.8937 18.2468C15.6019 18.4717 15.3153 18.6925 15.0383 18.9109C14 19.7294 13 20.5 12 20.5C11 20.5 10 19.7294 8.96173 18.9109C8.68471 18.6925 8.39814 18.4717 8.10627 18.2468Z" fill="var(--color-secondary)"></path> </g></svg>
    `;
  fav.append(favoff);

  const exist = user.favProducts.find((p) => p.id == product.id);

  if (exist) {
    favoff.remove();
    fav.append(favon);
  }
  fav.addEventListener("click", () => {
    if (fav.contains(favoff)) {
      favoff.remove();
      fav.append(favon);
      user.favProducts.push(product);
    } else {
      favon.remove();
      fav.append(favoff);
      const index = user.favProducts.findIndex((p) => p.id == product.id);
      user.favProducts.splice(index, 1);
      user.favProducts;
    }
    saveUser(user);
  });

  fav.addEventListener("click", (e) => e.stopPropagation());
  fav.classList.add("card-fav");
  if (hasButton) {
    button.append(fav);
    card.append(button);
  }

  return card;
}
