const API_URL = config.apiHost;

makeProductDetail();

function makeProductDetail() {
  const _id = getProduct_id();
  const url = makeUrlToGetProductData(_id);

  getProductData(url)
    .then(res => {
      const res1 = makeDatailImageHTML(res);
      const res2 = makeDetailDescriptionOneHTML(res);

      return [res1, res2];
    })
    .then(([res1, res2]) => {
      insertDetailImageHTML(res1);
      insertDetailDescriptionOneHTML(res2);
    })
    .then(() => addEventListenerToAddProductToCartButton())
    .then(() => addEventListenerToOrderProductNowButton());

  function getProduct_id() {
    const pathname = window.location.pathname;

    const _id = pathname.split('/')[2];

    return _id;
  }

  function makeUrlToGetProductData(product_id) {
    const url = API_URL + `/api/products/${product_id}`;

    return url;
  }

  async function getProductData(url) {
    try {
      console.log(url);
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      return data;
    } catch (error) {
      console.log(
        `error! at getProductData(). data is replaced dummy data.\n${error}`,
      );

      const data = dummy.getSelectedProductData('_id', _id);

      return data;
    }
  }

  function makeDatailImageHTML(productData) {
    let { img } = productData;

    const detailImageHTML = `
    <div class="detail-image">
      <img class="detail-image-img" src=${
        API_URL + img
      } onerror="this.onerror=null; this.src='/imgs/모래두지.png';" alt=""></img>
    </div>
    `;

    return detailImageHTML;
  }

  function makeDetailDescriptionOneHTML(productData) {
    const { _id, name, categoryName, price, description, stock } = productData;

    const detailDescriptionOneHTML = `
    <div class="detail-description" data-id='${_id}' data-name='${name}' data-price='${price}'>
      <div class="container-description-nameAndType">
        <div class="container-description-name">
          <div class="description-name">${name}</div>
        </div>
        <div class="container-description-type">
          <div class="description-type" style="display: none">${categoryName}</div>
        </div>
      </div>
      <div class="container-description-price">
        <div class="description-price">${price.toLocaleString()}원</div>
      </div>
      <div class="container-description-description">
        <div class="description-description">${description}</div>
      </div>
    </div>
    `;

    return detailDescriptionOneHTML;
  }

  function insertDetailImageHTML(detailImageHTML) {
    const detailImage = document.querySelector('.container-detail-image');

    detailImage.insertAdjacentHTML('beforeend', detailImageHTML);
  }

  function insertDetailDescriptionOneHTML(detailDescriptionOneHTML) {
    const detailDescriptionOne = document.querySelector('.one');

    detailDescriptionOne.insertAdjacentHTML(
      'beforeend',
      detailDescriptionOneHTML,
    );
  }

  function addEventListenerToAddProductToCartButton() {
    const addProductToCartButton = document.querySelector('.description-cart');

    addProductToCartButton.addEventListener('click', addProductToCart);
  }

  function addEventListenerToOrderProductNowButton() {
    const orderProductNowButton = document.querySelector('.description-order');

    orderProductNowButton.addEventListener('click', orderProductNow);
  }

  function addProductToCart() {
    const hiddenDataForCart = document.querySelector('.detail-description');
    const countInput = document.querySelector('#count');
    const _id = hiddenDataForCart.dataset.id;
    const name = hiddenDataForCart.dataset.name;
    const price = Number(hiddenDataForCart.dataset.price);
    const quantity = Number(countInput.options[countInput.selectedIndex].value);

    const productData = { _id, name, price, quantity };

    const productDataForCart = convertProductDataForCart(productData);

    let cartData = getCartData();

    if (!isCart()) {
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

    cartData[alreadyInCartDataIndex].quantity += quantity;

    const updatedCartData = cartData;

    setCartStorage(updatedCartData);

    return;
  }

  function getCartData() {
    let cartData = JSON.parse(localStorage.getItem('cart'));

    return cartData;
  }

  function convertProductDataForCart(productData) {
    const { _id, name, price, quantity = 1, checked = true } = productData;

    const productDataForCart = { _id, name, price, quantity, checked };

    return productDataForCart;
  }

  function isCart() {
    const cartData = JSON.parse(localStorage.getItem('cart'));
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

  function orderProductNow() {
    const hiddenDataForCart = document.querySelector('.detail-description');
    const countInput = document.querySelector('#count');
    const _id = hiddenDataForCart.dataset.id;
    const name = hiddenDataForCart.dataset.name;
    const price = Number(hiddenDataForCart.dataset.price);
    const quantity = Number(countInput.options[countInput.selectedIndex].value);

    const productDataForOrderNow = { _id, name, price, quantity };

    setOrderStorage(productDataForOrderNow);

    window.location = '/order';
  }

  function setOrderStorage(productDataForOrderNow) {
    localStorage.setItem('order', JSON.stringify([productDataForOrderNow]));
  }
}
