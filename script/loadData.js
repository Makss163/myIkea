import { getData } from './getData.js';

const cartList = [
  {
    id: 'idd012',
    count: 1
  },
  {
    id: 'idd005',
    count: 5
  },
  {
    id: 'idd087',
    count: 2
  }
]


export const loadData = () => {

 /*  // когда заходим в корзину
  if(location.pathname.includes('cart')) {
    getData.cart(cartList, (result) => {
      console.log(result);
    });
    //console.log(cartList[0].id);
  } */

  /* getData.catalog((result) => {
    console.log(result);
  }); */

  //const catalog = document.querySelector('.catalog');
  //const activeCategory = catalog.querySelector('.active').textContent;

  /* getData.subCatalog('Мебель', (result) => {
    console.log(result);
  }); */

};