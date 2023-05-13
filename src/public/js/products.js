// categoryList
makeCategoryList();

makeProductListByCategoryName('전체');

// categoryList func
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
}

async function getCategoryNameData() {
  try {
    const res = await fetch('url');
    const data = await data.json();

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

  categoryNameData.forEach(item => {
    categoryListHTML += `<li class=${
      item === '전체' ? 'selected' : null
    } data-id=${item}>${item}</li>`;
  });

  return categoryListHTML;
}

function insertCategoryListHTML(categoryListHTML) {
  const categoryList_ul = document.querySelector(
    '.cartegoryBar-categoryList-ul',
  );

  categoryList_ul.insertAdjacentHTML('beforeend', categoryListHTML);
}

function addEventListenerToCategoryList() {
  const categoryListButton = document.querySelectorAll(
    '.cartegoryBar-categoryList-ul > li',
  );

  categoryListButton.forEach(item => {
    const eachCategoryListButton = item;

    eachCategoryListButton.addEventListener('click', e => {
      const target = e.target;
      changeBackgroundColorAtSelectedCategoryListButton(target);
    });

    eachCategoryListButton.addEventListener('click', e => {
      const categoryName = e.target.dataset.id;
      makeProductListByCategoryName(categoryName);
    });
  });
}

function changeBackgroundColorAtSelectedCategoryListButton(target) {
  const categoryListButton = document.querySelectorAll(
    '.cartegoryBar-categoryList-ul > li',
  );
  categoryListButton.forEach(item => {
    item.classList.remove('selected');
  });

  target.classList.add('selected');
}

function makeProductListByCategoryName(categoryName) {
  getProductDataByCategoryName(categoryName)
    .then(res => createProductListHTML(res))
    .then(res => insertProductListHTML(res))
    .then(() => addEventListenerToAddCartButton());
}

async function getProductDataByCategoryName(categoryName) {
  try {
    const res = await fetch(
      categoryName === '전체'
        ? `/products`
        : `/products?category=${categoryName}`,
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
              <img class="productListByCategory-list-image" src=${img} onerror="this.onerror=null; this.src='/imgs/모래두지.png';" alt=""></img>
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
            <button class="productListByCategory-list-like-button" data-_id=${_id} data-name=${name} data-price=${price}>장바구니에 추가</button>
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

// * 장바구니 버튼
function addEventListenerToAddCartButton() {
  const addCartButton = document.querySelectorAll(
    '.productListByCategory-list-like-button',
  );

  addCartButton.forEach(item => {
    const eachAddCartButton = item;

    eachAddCartButton.addEventListener('click', e => addProudctToCart(e));
  });
}

function addProudctToCart(e) {
  let cartData = getCartData();

  let { _id, name, price } = e.target.dataset;
  _id = Number(_id);

  const productData = { _id, name, price };
  const productDataForCart = setProductDataForCart(productData);

  if (!isCart(cartData)) {
    createCartStorage(productDataForCart);
    return;
  }

  const alreadyInCartDataIndex = cartData.findIndex(item => item._id === _id);

  if (alreadyInCartDataIndex === -1) {
    cartData.push(productDataForCart);
    const updatedCartData = cartData;
    setCartStorage(updatedCartData);

    return;
  }

  cartData[alreadyInCartDataIndex].quantity++;

  const updatedCartData = cartData;

  setCartStorage(updatedCartData);
}

function getCartData() {
  let cartData = JSON.parse(localStorage.getItem('cart'));

  return cartData;
}

function isCart(cartData) {
  if (cartData === null) {
    return false;
  }

  return true;
}

function createCartStorage(firstProductDataForCart) {
  localStorage.setItem('cart', JSON.stringify([firstProductDataForCart]));
}

function setCartStorage(productDataForCart) {
  localStorage.setItem('cart', JSON.stringify(productDataForCart));
}

function setProductDataForCart(productData) {
  const { _id, name, price, quantity = 1, checked = true } = productData;

  const productDataForCart = { _id, name, price, quantity, checked };

  return productDataForCart;
}
