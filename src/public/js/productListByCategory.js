// * 카테고리 목록 생성.
const cartegoryBar_categoryList_ul = document.querySelector('.cartegoryBar-categoryList-ul');

makeCategoryList();

async function makeCategoryList() {
  // const data = await fetch('/category'); 

  // 데이터 받았다 치고,

  // * 관리자가 지정한 카테고리 목록.
  const data = [ { _id : 1, type : '물' }, { _id : 2, type : '전기' }, { _id : 3, type : '풀' }, 
  // { _id : 4, type : '바람' }, { _id : 5, type : '바위' }, { _id : 6, type : '용기' },  { _id : 7, type : '권력' }, { _id : 8, type : '고통' }, { _id : 9, type : '프롤레타리아' }, { _id : 10, type : '자본가' }, { _id : 11, type : '혁명가' }, 
  ];

  let categoryListLiHTML = '';

  data.forEach(item => {
    const { type } = item;

    let typeColor;
    
    switch(type) {
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

    categoryListLiHTML += `<li><a href="/category/${ type }" id=${ type } style="color: ${ typeColor }";>${ type }</a></li>`
  })

  cartegoryBar_categoryList_ul.innerHTML += categoryListLiHTML;
}

// * 선택된 카테고리의 상품 리스트 출력.
const productListByCategory_list_ul = document.querySelector('.productListByCategory-list-ul');

async function makeProductList() {
  // const data = await fetch('/');
  
  // 데이터 받았다 치고.
  
}

const data = [];

for(i = 0; i < 50; i++) {
  
  const product = {
    name: '이상해씨',
    price: 12500,
    type: '풀',
  }

  data.push(product);
}

// 데이터 받았다 치고,

let liHTML = '';

makeLiHTML()

productListByCategory_list_ul.innerHTML = liHTML;

let alreadyInCartData = JSON.parse(localStorage.getItem('cart'));

const putInCartButton = document.querySelectorAll('.productListByCategory-list-like-button');

data.forEach((item, index) => {
  putInCartButton[index].addEventListener('click', () => {

    if(alreadyInCartData == null) {
      // data 객체에 더해줄 필드.
      item.count = 1;
      item.checked = true;

      // data 객체에서 빼줄 필드.
      delete item.type;
      
      alreadyInCartData = [];
      alreadyInCartData.push(item);

      localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
    }
    else{
      const findedIndex = alreadyInCartData.findIndex((({ name }) => name == item.name));

      if(findedIndex == -1){
        item.count = 1;
        item.checked = true;

        delete item.type;

        alreadyInCartData.push(item);

        localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
      }
      else {
        alreadyInCartData[findedIndex].count++
        localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
      }
    }
  })
}) 

function makeLiHTML() {
  data.forEach(item => {
    let { name, price, type } = item;
  
    price = Number(price).toLocaleString();
    image = `../img/${name}.png`;
  
    let typeColor;
    
    switch(type) {
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
  
    liHTML += 
    `
    <li class="productListByCategory-list-li">
      <a href="/detail/${name}">
        <div class="container-productListByCategory-list-image">
          <img class="productListByCategory-list-image" src=${image} alt="">
        </div>
        <div class="container-productListByCategory-list-description">
          <div class="container-productListByCategory-list-description-name">
            <div class="productListByCategory-list-description-name">${name}</div>
          </div>
          <div class="container-productListByCategory-list-description-price">
            <div class="productListByCategory-list-description-price">${price}원</div>
          </div>
          <div class="container-productListByCategory-list-description-type">
            <div class="productListByCategory-list-description-type"
              style="background-color: ${typeColor}">${type}</div>
          </div> 
        </div>
      </a>
      <div class="container-productListByCategory-list-description-like">
        <button class="productListByCategory-list-like-button">장바구니에 추가</button>
      </div>
    </li>`
  })  
}