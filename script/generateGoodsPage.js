// страница списка товаров, полученного в резултате поиска разными способами (по каталогам, строке поиска)

import { getData } from "./getData.js";
import userData from "./userData.js";

// метод запускает формирование контента
const generateGoodsPage = () => {

  const mainHeader = document.querySelector('.main-header');
  const goodsList = document.querySelector('.goods-list');

  // функция заполнени карточек товаров контентом в результате поиска
  const generadeCards = (data) => {

    const COUNT = 6;
    goodsList.textContent = '';
    let content = '';

    // если возвращаемые данные пусты
    /* if(!data.length) {
      const goods = document.querySelector('.goods');
      // если ждём данные, состветсвующие товарам из списка понравившихся
      if(location.search === '?wishlist') {
        goods.textContent = 'Список желаний пуст';
      }
    } */

    // данные из БД перебираем, из отдельных объектов берем данные для соответствующиз товаров
    data.forEach(element => {

      // вынесем отдельные св-ва объекта в переменные с помощью деструктуризации
      const { name: itemName, count, price, description, id, img } = element;

      content = `
        <li class="goods-list__item">
          <a class="goods-item__link" href="card.html#${id}">
            <article class="goods-item">
              <div class="goods-item__img">
                <img src="${img[0]}"
                  ${img[1] ? `data-second-image=${img[1]}` : ''}
                  alt="${itemName}">
              </div>
              ${ count >= COUNT ? `<p class="goods-item__new">Новинка</p>` :
              count === 0 ? '<p class="goods-item__new">Нет в наличии</p>' : '<p class="goods-item__new"></p>' }
              
              <h3 class="goods-item__header">${itemName}</h3>
              <p class="goods-item__description">${description}</p>
              <p class="goods-item__price">
                <span class="goods-item__price-value">${price}</span>
                <span class="goods-item__currency"> ₽</span>
              </p>
              ${count ? `<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${id}"></button>` : '' }
              
            </article>
          </a>
        </li>
      `;
      goodsList.insertAdjacentHTML('afterbegin', content);

    });
  }
  /* generadeCards */


  if(location.search && location.pathname.includes('goods')) {
    // из объекта location берём значение свойства search, декодируем его в руссий язык
    let search = decodeURI(location.search); 

    /*
    по содержимому из location.search определяем, откуда пошёл поиск.
    (данные из сформированного GET запроса)
    */
    console.log(search);
    search = search.split('='); // перезаписываем переменную, теперь переменная хранит ссылку на массив, который поулчился разбитием строки по символу '='
    const prop = search[0].substring(1); //свойство запроса, откуда идёт запрос
    const value = search[1]; // значение запроса, что ищем
    console.log(prop);
    
    /* в зависимости от способа запроса */
    // для поиска по строке поиска
    if(prop === 's') {

      getData.search(value, (result) => {

        // формируем заголовок в зависимости от того, найдены ли искомые товары
        if(result.length === 0 || value.length === 0) {
          mainHeader.textContent = `По запросу ничего не найдено`;
        } else {
          mainHeader.textContent = `Поиск: ${value}`;
        }
        console.log(result);
        generadeCards(result);

      });
      // для поиска по списку желаемого
    } else if(prop === 'wishlist') {
      
      // userData.wishList - геттер, возвращает wishListData
      getData.wishList(userData.wishList, (result) => {
        // получаем result - массив объектов из БД, полученных по массиву id из wishListData
        // формируем заголовок в зависимости от того, есть ли понравившиеся товары
        if(result.length === 0) {
          mainHeader.textContent = 'Понравившихся товаров пока не отмечено';
        } else {
          mainHeader.textContent = 'Список понравившихся товаров';
        }
        generadeCards(result);
        console.log(userData.wishList);

      });
      // для поиска по каталогам
    } else if (prop === 'cat' || prop === 'subcat') {

      getData.category(prop, value, (result) => {

        mainHeader.textContent = value;
        generadeCards(result);

      });
      
    }

    goodsList.addEventListener('click', (event) => {
      // если при клике попадаем по кнопке "добавить в корзину"
      const btnAddCard = event.target.closest('.btn-add-card');

      if(btnAddCard) {
        event.preventDefault();
        // находим id товара в атрибуте dataset.idd
        const id = btnAddCard.dataset.idd;
        //вызываем сеттер из userData для корзины
        userData.cartList = id;
      }

    });
    
  }
};

export default generateGoodsPage;