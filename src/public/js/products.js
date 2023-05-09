const cartegoryBar_categoryList_ul = document.querySelector(
  '.cartegoryBar-categoryList-ul',
);
const productListByCategory_list_ul = document.querySelector(
  '.productListByCategory-list-ul',
);

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
      stock: 20,
    },
    {
      _id: 2,
      img: 'url',
      name: '메타몽',
      price: 1000,
      categoryName: '포켓몬',
      stock: 20,
    },
    {
      _id: 3,
      img: 'url',
      name: '이상해씨',
      price: 1000,
      categoryName: '포켓몬',
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

let categoryNameData = dummy.categoryNameData.map(item => {
  return item.main;
});

let productData = dummy.productData;

// 카테고리바 제작
let categoryListHTML = '';

categoryNameData.forEach(item => {
  categoryListHTML += `<li data-id=${item}>${item}</li>`;
});

cartegoryBar_categoryList_ul.insertAdjacentHTML('beforeend', categoryListHTML);

const categoryListButton = document.querySelectorAll(
  '.cartegoryBar-categoryList-ul > li',
);

categoryListButton.forEach((item, index) => {
  const eachCategoryListButton = categoryListButton[index];

  eachCategoryListButton.addEventListener('click', e => {
    const target = e.target;

    categoryListButton.forEach(item => {
      item.classList.remove('selected');
    });

    target.classList.add('selected');

    const categoryName = item.dataset.id;

    // fetch(`api/products?category=${categoryName}`)
    //   .then(res => res.json())
    //   .then(res => {})
    //   .catch(ddd => console.log(new Error(ddd)));

    // const filteredData = productData.filter(
    //   item => item.categoryName == categoryName,
    // );

    // console.log(filteredData);

    makeProductList(categoryName);
  });
});

makeProductList('포켓몬');

function makeProductList(categoryName) {
  // fetch(`api/products?category=${categoryName}`)
  //   .then(res => res.json())
  //   .then(res => {

  const filteredData = productData.filter(
    item => item.categoryName == categoryName,
  );

  let productListHTML = '';

  // res.forEach(({ _id, img, name, price, categoryName, stock }) => {
  filteredData.forEach(({ _id, img, name, price, categoryName, stock }) => {
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
                  <div class="productListByCategory-list-description-type">${categoryName}</div>
                </div>
              </div>
            </a>
            <div class="container-productListByCategory-list-description-like">
              <button class="productListByCategory-list-like-button" data-id=${_id}>장바구니에 추가</button>
            </div>
          </li>
          `;
  });

  productListByCategory_list_ul.textContent = '';
  productListByCategory_list_ul.insertAdjacentHTML(
    'beforeend',
    productListHTML,
  );
  // });
}

// * 장바구니 버튼 기능
let alreadyInCartData = JSON.parse(localStorage.getItem('cart'));

const addCartButton = document.querySelectorAll(
  '.productListByCategory-list-like-button',
);

addCartButton.forEach((item, index) => {
  const eachAddCartButton = addCartButton[index];

  eachAddCartButton.addEventListener('click', e => {
    const _id = e.target.dataset.id;

    const findedItem = productData.find(item => item._id === Number(_id));

    if (alreadyInCartData == null) {
      // data 객체에 더해줄 필드.
      findedItem.quantity = 1;
      findedItem.checked = true;

      // data 객체에서 빼줄 필드.
      delete findedItem.categoryName;

      alreadyInCartData = [];
      alreadyInCartData.push(findedItem);

      localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
    } else {
      findedIndex = alreadyInCartData.findIndex(
        ({ _id }) => _id == findedItem._id,
      );

      if (findedIndex == -1) {
        findedItem.quantity = 1;
        findedItem.checked = true;

        delete findedItem.categoryName;

        alreadyInCartData.push(findedItem);

        localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
      } else {
        alreadyInCartData[findedIndex].quantity++;
        localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
      }
    }
  });
});
