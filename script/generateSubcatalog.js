
const generateSubcatalog = () => {

  // формируем блок подкаталога
  const subCatalog = document.createElement('div');
  subCatalog.classList.add('subcatalog');
  
  // функция будет принимать список подкатегорий (data) - из callback функции в subCatalog
  const updateSubCatalog = (header, list) => {
    // list - список подкатегорий

    subCatalog.textContent = '';
    let subCatalogList = '';
    
    // перебираем массив имён подкатегорий и помещаем каждое имя в список в вёрстке
    list.forEach(item => {
      subCatalogList += `
        <li class="subcatalog-list__item">
          <a href="goods.html?subcat=${item}">${item}</a>
        </li>
      `
    });

    const subcatalogHTML = `
    <button type="button" class="btn btn-return catalog-btn" aria-expanded="true" title="Закрыть меню"
            aria-label="Закрыть меню">
        <svg focusable="false" class="svg-icon  hnf-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.70613 11.2927L3.99902 11.9997L4.70606 12.7069L11.999 20.0008L13.4133 18.5867L7.82744 13.0001H19.9999V11.0001H7.82729L13.4144 5.41328L12.0002 3.99902L4.70613 11.2927Z"></path>
        </svg>
    </button>
    <h3 class="subcatalog-header"><a href="goods.html?cat=${header}"></a>${header}</h3>
    <ul class="subcatalog-list">
        ${subCatalogList}
    </ul>
    `;

    // помещаем вёрстку subcatalogHTML в блок div subcatalog
    subCatalog.insertAdjacentHTML('afterbegin', subcatalogHTML); 
  }

  document.body.insertAdjacentElement('beforeend', subCatalog);
  return updateSubCatalog;

}

export default generateSubcatalog;