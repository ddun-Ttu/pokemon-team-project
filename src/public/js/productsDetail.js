// const detail = document.querySelector('.detail');
// const putInCartButton = document.querySelector('.description-cart');
// const orderNowButton = document.querySelector('.description-order');
// const countInput = document.querySelector('#count');

makeProductDetail();

function makeProductDetail() {
  const _id = Number(getProduct_id());
  const url = makeUrlToGetProductData(_id);

  getProductData(url)
    .then(([res]) => {
      const res1 = makeDatailImageHTML(res);
      const res2 = makeDetailDescriptionOneHTML(res);

      return [res1, res2];
    })
    .then(([res1, res2]) => {
      insertDetailImageHTML(res1);
      insertDetailDescriptionOneHTML(res2);
    })
    .then(() => {});

  function getProduct_id() {
    const pathname = window.location.pathname;
    const _id = pathname.split('/')[2];

    return _id;
  }

  function makeUrlToGetProductData(product_id) {
    const url = `http://api/products/${product_id}`;

    return url;
  }

  async function getProductData(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(
        `error! at getProductData(). data is replaced dummy data.\n${error}`,
      );

      const data = dummy.getSelectedProductData('_id', _id);
      console.log(data);
      return data;
    }
  }

  function makeDatailImageHTML(productData) {
    let { img } = productData;

    const detailImageHTML = `
    <div class="detail-image">
      <img class="detail-image-img" src=${img} onerror="this.onerror=null; this.src='/imgs/모래두지.png';" alt=""></img>
    </div>
    `;

    return detailImageHTML;
  }

  function makeDetailDescriptionOneHTML(productData) {
    const { name, categoryName, price, description, stock } = productData;

    const detailDescriptionOneHTML = `
    <div class="detail-description">
      <div class="container-description-nameAndType">
        <div class="container-description-name">
          <div class="description-name">${name}</div>
        </div>
        <div class="container-description-type">
          <div class="description-type" style="display: 'none'">${categoryName}</div>
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

  function addProductToCart() {

    function addEventListenerToElement(element) {
      element.addEventListener('click', e => {
        let { _id, name, price } = e.target.dataset;
        _id = Number(_id);

        addProudctToCart(_id, name, price);
      });
    }

    function addProudctToCart(_id, name, price) {
      let cartData = getCartData();

      const productData = { _id, name, price };
      const productDataForCart = convertProductDataForCart(productData);

      if (!isCart()) {
        createCartStorage(productDataForCart);

        return;
      }

      const alreadyInCartDataIndex = cartData.findIndex(
        item => item._id === _id,
      );

      if (alreadyInCartDataIndex === -1) {
        cartData.push(productDataForCart);

        const updatedCartData = cartData;

        setCartStorage(updatedCartData);

        return;
      }

      cartData[alreadyInCartDataIndex].quantity++;

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
  }
  
  }
}

// let productData = dummy.productData;

const _id = pathname.split('/')[2];

const findedItem = productData.find(item => item._id === Number(_id));

const data = findedItem;

let { img, name, categoryName, price, description, stock } = data;

makeDetail();

async function makeDetail() {
  // const res = await fetch(`${common.API_URL}/api${pathname}`);
  // let data = await res.json();

  // pricetoLocaleString = Number(price).toLocaleString();

  let typeColor;

  switch (categoryName) {
    case '물':
      typeColor = 'rgb(41, 146, 255)';
      break;
    case '전기':
      typeColor = 'rgb(255, 219, 0)';
      break;
    case '풀':
      typeColor = 'green';
      break;
  }

  const detailImage = document.querySelector('.container-detail-image');
  const detailDescriptionOne = document.querySelector('.one');

  const detailImageHTML = detailImage.insertAdjacentHTML(
    'beforeend',
    detailImageHTML,
  );

  const detailDescriptionOneHTML = `
    <div class="detail-description">
      <div class="container-description-nameAndType">
        <div class="container-description-name">
          <div class="description-name">${name}</div>
        </div>
        <div class="container-description-type">
          <div class="description-type" style="background-color: ${typeColor}">${categoryName}</div>
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

  detailDescriptionOne.insertAdjacentHTML(
    'beforeend',
    detailDescriptionOneHTML,
  );

  putInCartButton.addEventListener('click', putInCartButtonHandler);

  orderNowButton.addEventListener('click', orderNowButtonHandler);

  function putInCartButtonHandler() {
    let alreadyInCartData = JSON.parse(localStorage.getItem('cart'));

    const count = Number(countInput.options[countInput.selectedIndex].value);

    let data = {
      _id,
      name,
      price,
    };

    if (alreadyInCartData == null) {
      // data 객체에 더해줄 필드.
      data.quantity = count;
      data.checked = true;

      // data 객체에서 빼줄 필드.

      alreadyInCartData = [];
      alreadyInCartData.push(data);

      localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
    } else {
      const findedIndex = alreadyInCartData.findIndex(item => item._id == _id);

      if (alreadyInCartData !== null && findedIndex == -1) {
        data.quantity = count;
        data.checked = true;

        alreadyInCartData.push(data);

        localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
      } else {
        alreadyInCartData[findedIndex].quantity += count;
        localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
      }
    }
  }

  function orderNowButtonHandler() {
    const count = Number(countInput.options[countInput.selectedIndex].value);
    let quantity = count;

    let data = [
      {
        _id,
        name,
        price,
        quantity,
      },
    ];

    localStorage.setItem('order', JSON.stringify(data));

    window.location = '/order';
  }
}
