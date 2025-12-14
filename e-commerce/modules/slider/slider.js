import { createCard } from "../card/card.js";
import { createDiscount } from "../discount/discount.js";
const SLIDER_OFFSET = 170;
export function createSlider(
  products,
  width,
  hasCount = false,
  hasButton = true
) {
  const slider = document.createElement("div");
  slider.classList.add("slider");
  const scroll = document.createElement("div");
  scroll.classList.add("slider-scroll");
  const container = document.createElement("div");
  container.classList.add("slider-conteiner");

  if (products) {
    if (products.length <= 0) {
      container.innerHTML =
        /*html*/
        `<h3 style="color:var(--color-warning)" >No Products Found!</h3>`;
    }
    products.map((p, index) => {
      const card = createCard(p, index, hasCount, hasButton);
      card.style.width = width + "px";
      card.style.margin = "0 10px";
      if (p.hasDiscount) {
        const discount = createDiscount(p);
        card.append(discount);
      }
      container.append(card);
    });
  }

  const nextBtn = document.createElement("button");
  nextBtn.classList.add("slider-btn", "slider-next-btn");
  nextBtn.innerHTML =
    /*html*/
    `
    <svg color="var(--color-secondary)" stroke="var(--color-secondary)" fill="var(--color-secondary)" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="var(--color-secondary)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow-left-square</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-412.000000, -983.000000)" fill="var(--color-secondary)"> <path d="M434,998 L423.414,998 L427.535,993.879 C427.926,993.488 427.926,992.855 427.535,992.465 C427.145,992.074 426.512,992.074 426.121,992.465 L420.465,998.121 C420.225,998.361 420.15,998.689 420.205,999 C420.15,999.311 420.225,999.639 420.465,999.879 L426.121,1005.54 C426.512,1005.93 427.145,1005.93 427.535,1005.54 C427.926,1005.15 427.926,1004.51 427.535,1004.12 L423.414,1000 L434,1000 C434.553,1000 435,999.553 435,999 C435,998.448 434.553,998 434,998 L434,998 Z M442,1011 C442,1012.1 441.104,1013 440,1013 L416,1013 C414.896,1013 414,1012.1 414,1011 L414,987 C414,985.896 414.896,985 416,985 L440,985 C441.104,985 442,985.896 442,987 L442,1011 L442,1011 Z M440,983 L416,983 C413.791,983 412,984.791 412,987 L412,1011 C412,1013.21 413.791,1015 416,1015 L440,1015 C442.209,1015 444,1013.21 444,1011 L444,987 C444,984.791 442.209,983 440,983 L440,983 Z" id="arrow-left-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
    `;

  nextBtn.addEventListener("click", () => {
    scroll.scrollLeft -= SLIDER_OFFSET;
  });
  scroll.addEventListener("scroll", () => {
    if (scroll.scrollLeft === 0) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "block";
    }
  });

  const previousBtn = document.createElement("button");
  previousBtn.classList.add("slider-btn", "slider-previous-btn");
  previousBtn.innerHTML =
    /*html*/
    `
    <svg viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="var(--color-secondary)" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>arrow-left-square</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-412.000000, -983.000000)" fill="var(--color-secondary)"> <path d="M434,998 L423.414,998 L427.535,993.879 C427.926,993.488 427.926,992.855 427.535,992.465 C427.145,992.074 426.512,992.074 426.121,992.465 L420.465,998.121 C420.225,998.361 420.15,998.689 420.205,999 C420.15,999.311 420.225,999.639 420.465,999.879 L426.121,1005.54 C426.512,1005.93 427.145,1005.93 427.535,1005.54 C427.926,1005.15 427.926,1004.51 427.535,1004.12 L423.414,1000 L434,1000 C434.553,1000 435,999.553 435,999 C435,998.448 434.553,998 434,998 L434,998 Z M442,1011 C442,1012.1 441.104,1013 440,1013 L416,1013 C414.896,1013 414,1012.1 414,1011 L414,987 C414,985.896 414.896,985 416,985 L440,985 C441.104,985 442,985.896 442,987 L442,1011 L442,1011 Z M440,983 L416,983 C413.791,983 412,984.791 412,987 L412,1011 C412,1013.21 413.791,1015 416,1015 L440,1015 C442.209,1015 444,1013.21 444,1011 L444,987 C444,984.791 442.209,983 440,983 L440,983 Z" id="arrow-left-square" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>    `;

  previousBtn.addEventListener("click", () => {
    scroll.scrollLeft += SLIDER_OFFSET;
  });
  scroll.addEventListener("scroll", () => {
    if (scroll.scrollLeft === scroll.scrollWidth - scroll.offsetWidth) {
      previousBtn.style.display = "none";
    } else {
      previousBtn.style.display = "block";
    }
  });
  const sliderHeader = document.createElement("h3");
  sliderHeader.classList.add("slider-header");
  sliderHeader.innerText = "Products";
  scroll.append(container);
  slider.append(scroll, nextBtn, previousBtn);
  return { sliderHeader, slider };
}
