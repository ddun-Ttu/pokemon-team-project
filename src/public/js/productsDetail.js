const detail = document.querySelector('.detail');
const putInCartButton = document.querySelector('.description-cart');
const orderNowButton = document.querySelector('.description-order');
const countInput = document.querySelector('#count');
const pathname = window.location.pathname;

// 더미 데이터)

const dummy = {
  categoryNameData: [
    { main: '포켓몬', sub: ['물', '불', '풀', '전기'] },
    { main: '몬스터볼' },
    { main: '사료' },
    { main: '진화의 돌' },
    { main: '악세서리' },
    { main: '인형' },
  ],
  productData: [
    {
      _id: 1,
      img: 'url',
      name: '꼬부기',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 2,
      img: 'url',
      name: '메타몽',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 3,
      img: 'url',
      name: '이상해씨',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 4,
      img: 'url',
      name: '피카츄',
      price: 1000,
      categoryName: '포켓몬',
      stock: 0,
    },
    {
      _id: 5,
      img: 'url',
      name: '몬스터볼',
      price: 1000,
      categoryName: '몬스터볼',
      stock: 20,
    },
    {
      _id: 6,
      img: 'url',
      name: '메타몽',
      price: 1000,
      categoryName: '포켓몬',
      stock: 0,
    },
    {
      _id: 7,
      img: 'url',
      name: '몬스터볼',
      price: 1000,
      categoryName: '몬스터볼',
      stock: 20,
    },
    {
      _id: 8,
      img: 'url',
      name: '피카츄',
      price: 1000,
      categoryName: '포켓몬',
      stock: 20,
    },
  ],
};

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

  const detailImageHTML = `
    <div class="detail-image">
      <img class="detail-image-img" src=${img} onerror="this.onerror=null; this.src='/imgs/모래두지.png';" alt=""></img>
    </div>
    `;

  detailImage.insertAdjacentHTML('beforeend', detailImageHTML);

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
