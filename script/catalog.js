import generateSubcatalog from "./generateSubcatalog.js";
import { getData } from "./getData.js";

const useCatalog = () => {
  const updateSubCatalogList = generateSubcatalog(); // поулчаем функцию, которую возвращает generateSubcatalog
  const btnBurger = document.querySelector('.btn-burger'); // кнопка открытия меню
  const catalog = document.querySelector('.catalog'); // боковое меню
  const subCatalog = document.querySelector('.subcatalog'); // подменю, открываемое по ссылке в меню
  const overlay = document.createElement('div'); // элемент, который покрывает весь документ при открытии меню
  overlay.classList.add('overlay');
  document.body.append(overlay);

  // функция открытия меню
  const openMenu = () => {
    catalog.classList.add('open');
    overlay.classList.add('active');
  };

  // функция закрытия меню
  const closeMenu = () => {
    catalog.classList.remove('open');
    overlay.classList.remove('active');
    closeSubMenu();
  }

  //функция закрытия меню при нажатии Esc
  const pressOnKeyEscape = (event) => {
    if(event.key == "Escape") {
      closeMenu();
    }
  }

  // функция открытия подменю и добавления классов active на элементы li
  const catalogHandler = (event) => {
    event.preventDefault(); //не даём ссылке отправить на другую страницу
    const catalogListItem = event.target.closest('.catalog-list__item'); //находим родительский узел li с заданным именем класса для ссылки, в которую попали
    const active = catalog.querySelector('.active'); // находим в области ul элемент в списке классов которого есть active (что-то из li)

    if(catalogListItem) { // если попали в область нужного элемента списка
      let categoryName = event.target.textContent;// имя категории

      // формируем подкаталог, вызываем метод subCatalog для получения списка подкатегорий;
      // передаём имя категории - categoryName, в зависимости от которой формируется список подкатегорий (data) в методе subCatalog
      // поулченный список подкатегорий принимает callback функция
      getData.subCatalog(categoryName, (data) => {

        // вызываем возвращаемую из generateSubcatalog функцию для формирования подкаталога
        // аргументы - необходимые данные для формирования списка подкаталога
        updateSubCatalogList(categoryName, data);

        // проверяем, отсутствует ли у искомого элемента li класс active
        if(!catalogListItem.classList.hasOwnProperty('active')) {

          // для другого li, у которого был в списке классов active, active убираем
          if(active) {
            active.classList.remove('active'); 
          }
          catalogListItem.classList.add('active');  // для того, по которому попали, active добавляем
          subCatalog.classList.add('subopen'); // открываем уже сформированное подменю

        } // если у тега li active и так есть, то ничего не делаем
      });

    } 

    // если попали по кнопке закрытия меню
    if(event.target.closest('.btn-close')) {
      closeMenu();
    }
    
  }

  // закрываем подменю
  const closeSubMenu = () => {
    subCatalog.classList.remove('subopen');
  }

  btnBurger.addEventListener('click', openMenu);
  overlay.addEventListener('click', closeMenu);
  catalog.addEventListener('click', catalogHandler);
  subCatalog.addEventListener('click', (event) => {
    const target = event.target;
    if(target.closest('.btn-return')) {
      closeSubMenu();
    }
  });
  document.addEventListener('keydown', pressOnKeyEscape);
}

export default useCatalog;