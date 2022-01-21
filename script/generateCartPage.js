import { getData } from "./getData.js";
import userData from "./userData.js";

const generateCartPage = () => {

  const cartList = document.querySelector('.cart-list');
  const cartTotalPrice = document.querySelector('.cart-total-price');

  const generateCartItems = (data) => {
    
    cartList.textContent = '';

    let cartItem = '';
    let totalPrice = 0;
    
    data.forEach((item) => {
      // деструктуризацией достаём значения свойств из каждого объекта из БД
      const { category, count, description, id, img, name, price, subcategory } = item;
      
      // находим количество соответствующего выбранного товара
      let countUser = userData.cartList.find(item => item.id === id).count;
      if(countUser > count) {
        countUser = count;
      }

      let totalRegular = price * countUser;

      let options = '';
      
      // добавляем столько вариантов количества товара, сколько есть в БД
      for(let i = 1; i <= count; i++) {
        options += `<option value="${i}" ${countUser === i ? 'selected' : ''}>${i}</option>`;
      }

      totalPrice += totalRegular;

      cartItem = `
        <li class="cart-item">
          <div class="product">
            <div class="product__image-container">
              <img src="${img[0]}" alt="${name}" aria-describedby="aria_product_description_40366083" itemprop="image">
            </div>
            <div class="product__description">
              <h3 class="product__name">
                <a href="card.html#${id}">${name}</a></h3>
              <p class="product_description-text">${description}</p>
            </div>
            <div class="product__prices">
              <div class="product__price-type product__price-type-regular">
                <div>
                  <div class="product__total product__total-regular">${totalRegular}.-</div>
                  <div class="product__price-regular">${price}.-</div> 
                </div>
              </div>
            </div>
            <div class="product__controls">

              <div class="product-controls__remove">
                <button type="button" class="btn btn-remove" data-idd="${id}">
                  <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                </button>
              </div>
              <div class="product-controls__quantity">
              
                <select class="product-count" title="Выберите количество" aria-label="Выберите количество" data-idd="${id}">
                  ${options}
                </select>
              
              </div>
            </div>
          </div>
        </li>
      `;
      // добавляем в начало списка отображаемых товаров
      cartList.insertAdjacentHTML('afterbegin', cartItem);
      
    });

    cartTotalPrice.textContent = totalPrice;

    cartList.addEventListener("change", (e) => {
      userData.changeCountCartItem = {
        id: e.target.dataset.idd,
        count: parseInt(e.target.value)
      };
      getData.cart(userData.cartList, generateCartItems);
      //console.log(e.target.value);
    });

    const btnRemove = cartList.querySelectorAll('.btn-remove');

    btnRemove.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.idd;
        userData.deleteCartItem = id;
        getData.cart(userData.cartList, generateCartItems);
      });
    });

  };

  // когда заходим в корзину
  if(location.pathname.includes('cart')) {
    getData.cart(userData.cartList, (result) => {
      
      generateCartItems(result);
      console.log(userData.cartList);
    });
  }

  

}

export default generateCartPage;