
import { getLocalStorage, setLocalStorage } from "./storage.js";


const userData = {

  // ************************* данные для списка понравившихся товаров *************

  // поулчаем данные для списка поравившихся товаров из local Storage
  wishListData: getLocalStorage('wishList'),

  get wishList() {
    return this.wishListData;
  },

  set wishList(id) {
    // если в списке уже есть id товара, удаляем, если нет - добавляем
    if(this.wishList.includes(id)) {
      const index = this.wishList.indexOf(id);
      this.wishList.splice(index, 1);
      //console.log(this.wishListData);
    } else {
      this.wishList.push(id);
      //console.log(this.wishListData);
    }
    setLocalStorage('wishList', this.wishList);
    console.log(this.wishList);
  },


  // ************************* данные для списка товаров в корзине *************

  // поулчаем данные для корзины товаров из local Storage
  cartListData: getLocalStorage('cart'),

  get cartList() {
    return this.cartListData;
  },

  set cartList(id) {
    // ищем в списке корзины элемент с указанным id
    // если с таким id елемент(объект) в массиве есть, копирруем ссылку на него в itemObj
    let itemObj = this.cartList.find(item => item.id === id);

    //если такой объект найден и ссылку на него скопировали
    if(itemObj) {
      // по ссылке в переменной itemObj меняем свойство count объекта в списке товаров корзины
      itemObj.count++;
    } else {
      /* если в корзине нет товара
      если объект в списке не найден, в переменную itemObj кладём ссылку на объект с id добавляемого товара,
      */
      itemObj = {
        id,
        count: 1
      };
      /* отправляем в массив ссылку на данный объект (теперь в массиве есть объект с id
      добавляемого в корзину товара и количеством этих товаров - count */
      this.cartList.push(itemObj);
    }
    // в local storage отправляем результирующий массив объектов с id и количеством соответствующих товаров
    setLocalStorage('cart', this.cartList);
  },

  set changeCountCartItem(itemCart) {
    let obj = this.cartList.find(item => item.id === itemCart.id);
    obj.count = itemCart.count;
    setLocalStorage('cart', this.cartList);
  },

  set deleteCartItem(id) {
    let deleteObj = this.cartList.find(item => item.id === id);
    const index = this.cartList.indexOf(deleteObj);
    this.cartList.splice(index, 1);
    setLocalStorage('cart', this.cartList);
  }
}

export default userData;