import userData from "./userData.js";

// получаем количество товаров в корзине
const getCountCart = () => {
  let sumCountCartItems = 0;
  for(let item of userData.cartList) {
    sumCountCartItems += item.count;
  }
  return sumCountCartItems;
};

export default getCountCart;