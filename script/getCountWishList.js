import userData from "./userData.js";

// получаем количество понравивишихся товаров
const getCountWishList = () => {
  const countWishItems = userData.wishList.length;
  return countWishItems;
};

export default getCountWishList;