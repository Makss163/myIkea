// создаём легенду для имён свойств у запросов для поиска их оответствия в БД (перевод названий свойств как в БД)
const PARAM = {
  cat: 'category',
  subcat: 'subcategory',
  search: ['name', 'description', 'category', 'subcategory']
};

export const getData = {
  url: 'database/dataBase.json',

  get(process) {
    // производим запрос к базе дынных
    // промис возвращает объект Responce, вызываем метод json,
    // преобразуем его содержимое в массив
    // новый промис возвращает содержимое файла dataBase.json
    // это содержимое передаём в process
    fetch(this.url)
    .then((response) => {
      return response.json();
    })
    .then(process);
  },

  // метод ищет в БД элементы, которые отмечены в списке понравившихся товаров
  wishList(list, callback) {
    // вызываем get передаём функцию (process), которая работает с содержимым базы данных 
    this.get((data) => {
      // data - элементы БД, полученные с помощью fetch
      // производим отбор элементов из базы данных, выбираем те, id которых есть в списке желаемых
      const result = data.filter((item) => list.includes(item.id));
      callback(result);
    });
  },

  // метод выбирает из БД элемент с нужным id
  // id берётся из св-ва hash объекта location (hash заполняется содержимым после # в адресной строке)
  item(hashContent, callback) {
    this.get((data) => {
      const result = data.find((item) => hashContent === item.id);
      callback(result);
    });
  },

  // метод выбирает из БД элементы, id которых есть среди элементов в корзине
  cart(list, callback) {
    this.get((data) => {
      const result = data.filter((item) => list.some((obj) => item.id === obj.id));
      callback(result);
    });
  },

  // метод возвращает элементы из БД, когда поиск производится из списка категорий товаров в каталоге
  // (в подменю)
  // в запросе значение формируется из текста в соответствующей ссылке из каталога
  category(prop, value, callback) {
    this.get((data) => {
      const result = data.filter((item) => item[PARAM[prop]].toLowerCase() === value.toLowerCase());
      callback(result);
    });
  },

  // метод возвращает элементы из БД, у которых в нужных свойствах (таких как в PARAM - category и subcategory) есть подстроки из поиска
  search(value, callback) {
    this.get((data) => {

      // получаем массив объектов, фильтруя элементы(объекты) из БД
      const result = data.filter((item) => {
        for(let prop in item) {
          // ищем среди тех свойств каждого объекта из БД, которые есть в списке в PARAM.search
          if(PARAM.search.includes(prop) && item[prop].toLowerCase().includes(value.toLowerCase())) {
            return true;
          }
        }
      });

      callback(result);
    });
  },

 // смотрим какие есть категории
  catalog(callback) {
    this.get((data) => {
      const result = data.reduce((arr, item) => {

        if(!arr.includes(item.category)) {
        arr.push(item.category);
        }
        
        return arr;
      }, []);
      callback(result);
    });
  },

  // смотрим, какие подкатегории есть для выбранной категории в value
  subCatalog(value, callback) {
  this.get((data) => {
    /* выберем из БД все элементы указанной в value категории,
    затем каждую подкатегорию в данной категории единоразово вынимаем и
    формируем массив из этих имён */
    const result = data
    .reduce((arr, item) => {
      if(!arr.includes(item.subcategory) && item.category === value) {
        arr.push(item.subcategory);
      }
      return arr;
    }, []);
    // в callback отправляется сформированный массив имён подкатегорий
    callback(result);
  });
}

}
