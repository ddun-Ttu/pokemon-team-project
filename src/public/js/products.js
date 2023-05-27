import { Utility } from './common/utility.js';

const API_URL = config.apiHost;

console.log('API_URL', API_URL);

// print_categoryList
makeCategoryList();

// print_productListByCategoryName
makeProductListByCategoryName('전체');

// makingStep_categoryList
function makeCategoryList() {
  getCategoryNameData()
    .then(res => createCategoryListHTML(res))
    .then(res => insertCategoryListHTML(res))
    .then(() => addEventListenerToCategoryList())
    .catch(error =>
      console.log(`
    error! at makeCategoryList().
    ${error}
    `),
    );

  const categoryList_ul = document.querySelector(
    '.cartegoryBar-categoryList-ul',
  );

  async function getCategoryNameData() {
    try {
      console.log(API_URL + `/api/categories`);
      const res = await fetch(API_URL + `/api/categories`, { method: 'GET' });
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(`
    error! at getCategoryNameData().
    server yet. replaced with dummy data.
    ${error}
    `);

      const data = dummy.categoryNameData;

      return data;
    }
  }

  function createCategoryListHTML(categoryNameData) {
    let categoryListHTML = '';

    // categoryList의 버튼 역할을 하는 li 요소에 data-id="해당-categoryName" 설정.
    // - categoryList의 특정 categoryName 클릭 시 해당 categoryName을 반환받기 위함.
    // - 반환받은 categoryName은 makeProductListByCategoryName(categoryName) 함수에 파라미터로 넘어감.
    categoryNameData.forEach(item => {
      categoryListHTML += `<li class=${
        item === '전체' ? 'selected' : null
      } data-id='${item.name}'>${item.name}</li>`;
    });

    return categoryListHTML;
  }

  function insertCategoryListHTML(categoryListHTML) {
    categoryList_ul.insertAdjacentHTML('beforeend', categoryListHTML);
  }

  function addEventListenerToCategoryList() {
    categoryList_ul.addEventListener('click', e => {
      // 상위 요소의 나머지 영역 클릭 시 핸들러 작동 방지
      if (e.target === e.currentTarget) {
        return;
      }

      const target = e.target;
      const categoryName = e.target.dataset.id;

      changeBackgroundColorAtSelectedCategoryListButton(target);

      makeProductListByCategoryName(categoryName);
    });
  }

  function changeBackgroundColorAtSelectedCategoryListButton(target) {
    const categoryListButton = document.querySelectorAll(
      '.cartegoryBar-categoryList-ul > li',
    );

    // categoryList 각 항목 클릭 시 해당 요소에만 'selected' class 설정.
    // - 선택된 항목 강조.
    categoryListButton.forEach(item => {
      item.classList.remove('selected');
    });

    target.classList.add('selected');
  }
}

// makingStep_productListByCategoryName
function makeProductListByCategoryName(categoryName) {
  getProductDataByCategoryName(categoryName)
    .then(res => createProductListHTML(res))
    .then(res => insertProductListHTML(res))
    .then(() =>
      Utility.makeElementBecomeAddToCartButton(
        '.productListByCategory-list-like-button',
      ),
    )
    .then(() =>
      Utility.makePagination(
        '.container-paginationButton',
        '.productListByCategory-list-li',
        10,
        'pagination-Tohighlight-selectedButton',
        'pagination-ToHidden-unselectedData',
        1,
      ),
    );

  async function getProductDataByCategoryName(categoryName) {
    try {
      const res = await fetch(
        categoryName === '전체'
          ? API_URL + `/api/products`
          : API_URL + `/api/products?category=${categoryName}`,
        { method: 'GET' },
      );

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(`
            error! at getProductDataByCategoryName().
            server yet. replaced with dummy data.
            ${error}
          `);

      const data = dummy.getSelectedProductData('categoryName', categoryName);
      return data;
    }
  }

  function createProductListHTML(productDataByCategoryName) {
    let productListHTML = '';

    productDataByCategoryName.forEach(
      ({ _id, img, name, price, categoryName, stock }) => {
        productListHTML += `
        <li class="productListByCategory-list-li">
          <a href="/products/${_id}">
            <div class="container-productListByCategory-list-image">
              <img class="productListByCategory-list-image" src=${
                API_URL + img
              } onerror="this.onerror=null; this.src='/imgs/모래두지.png';" alt=""></img>
            </div>
            <div class="container-productListByCategory-list-description">
              <div img="container-productListByCategory-list-description-name">
                <div class="productListByCategory-list-description-name">${name}</div>
              </div>
              <div class="container-productListByCategory-list-description-price">
                <div class="productListByCategory-list-description-price">${price.toLocaleString()}원</div>
              </div>
              <div class="container-productListByCategory-list-description-type">
                <div class="productListByCategory-list-description-type" style="display: none;">${categoryName}</div>
              </div>
            </div>
          </a>
          <div class="container-productListByCategory-list-description-like">
            <button class="productListByCategory-list-like-button" data-_id=${_id} data-name=${name} data-price=${price} data-img=${img}>장바구니에 추가</button>
          </div>
        </li>
        `;
      },
    );

    return productListHTML;
  }

  function insertProductListHTML(productListHTML) {
    const productList_ul = document.querySelector(
      '.productListByCategory-list-ul',
    );

    productList_ul.textContent = '';
    productList_ul.insertAdjacentHTML('beforeend', productListHTML);
  }
}
