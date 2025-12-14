export function createDiscount(product) {
  const discount = document.createElement("div");
  discount.classList.add("card-discount");
  const amount = document.createElement("div");
  amount.innerHTML =
    /*html*/
    `
     <div>${product.discountAmount}%</div>
     `;
  const time = document.createElement("div");
  time.classList.add("discount-time");
  discount.append(amount, time);
  timer(product.discountPeriod, time);

  return discount;
}

function timer(days, time) {
  const SECONDES_IN_DAY = 24 * 60 * 60;
  const SECONDES_IN_HOUR = 60 * 60;
  const SECONDES_IN_MINUTE = 60;

  let totalSecondes = days * SECONDES_IN_DAY;

  setInterval(() => {
    totalSecondes--;
    let day = Math.floor(totalSecondes / SECONDES_IN_DAY);
    let hour = Math.floor((totalSecondes / SECONDES_IN_HOUR) % 24);
    let minute = Math.floor((totalSecondes / SECONDES_IN_MINUTE) % 60);
    let secondes = totalSecondes % 60;
    time.innerHTML =
      /*html*/
      `
    <div>
    ${day} : ${hour} : ${minute} : ${secondes}
    </div>
    `;
  }, 1000);
}
