import { burgetIcon } from "../burger/burger.js";
import { cartIcon, cart } from "../cart/cart.js";
import { container } from "../container/container.js";
import { logo } from "../logo/logo.js";
import { navbar } from "../navbar/navbar.js";

export const mainHeader = document.createElement("header");
mainHeader.classList.add("main-header");

container.append(logo, navbar, burgetIcon, cartIcon, cart);

mainHeader.append(container);
