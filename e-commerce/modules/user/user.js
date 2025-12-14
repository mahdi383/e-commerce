export const user = {
  name: "Mahmood",
  password: "123456",
  email: "Mahmood@gmail.com",
  cartProducts: [],
  viewedProducts: [],
  favProducts: [],
};

export function saveUser(user) {
  const str = JSON.stringify(user);
  localStorage.setItem("user", str);
}

export function loadUser() {
  const str = localStorage.getItem("user");

  if (!str || str === "undefined") {
    return user;
  } else {
    const saved = JSON.parse(str);
    user.cartProducts = saved.cartProducts;
    user.viewedProducts = saved.viewedProducts;
    user.favProducts = saved.favProducts;
    return saved;
  }
}

export function getTotal() {
  const total = user.cartProducts.reduce((a, p) => {
    return a + p.price * p.count;
  }, 0);

  return Math.round(total * 100) / 100;
}
export function getDiscount() {
  const total = user.cartProducts.reduce((a, p) => {
    return a + ((p.price * p.discountAmount) / 100) * p.count;
  }, 0);

  return Math.round(total * 100) / 100;
}

window.addEventListener("load", () => {
  loadUser();
});
