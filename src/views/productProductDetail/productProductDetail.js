const detail = document.querySelector('.detail');
const putInCartButton = document.querySelector('.description-cart');
const orderNowButton = document.querySelector('.description-order');
const countInput = document.querySelector('#count');


const product = {
  image: '../../img/꼬부기.png',
  name: '꼬부기',
  price: 12500,
  description: '등껍질에 숨어 몸을 보호한다. 상대의 빈틈을 놓치지 않고 반격한다.',
  type: '물',
} 

// 데이터 받았다 치고,

let { image, name, type, price, description } = product;

pricetoLocaleString = Number(price).toLocaleString()

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

const detailImage = document.querySelector('.container-detail-image');
const detailDescriptionOne = document.querySelector('.one');

detailImage.innerHTML = 
`
<div class="detail-image">
  <img class="detail-image-img" src=${image} alt="">
</div>
`

detailDescriptionOne.innerHTML = 
`
<div class="detail-description">
  <div class="container-description-nameAndType">
    <div class="container-description-name">
      <div class="description-name">${name}</div>
    </div>
    <div class="container-description-type">
      <div class="description-type" style="background-color: ${typeColor}">${type}</div>
    </div>
  </div>
  <div class="container-description-price">
    <div class="description-price">${pricetoLocaleString}원</div>
  </div>
  <div class="container-description-description">
    <div class="description-description">${description}</div>
  </div>
</div> 
`

putInCartButton.addEventListener('click', putInCartButtonHandler);

orderNowButton.addEventListener('click', orderNowButtonHandler);

function putInCartButtonHandler() {
  let alreadyInCartData = JSON.parse(localStorage.getItem('cart'));

  const count = Number(countInput.options[countInput.selectedIndex].value);

  let data = {
    name,
    price,
  }

  if(alreadyInCartData == null) {
    // data 객체에 더해줄 필드.
    data.count = count;
    data.checked = true;

    // data 객체에서 빼줄 필드.
    
    alreadyInCartData = [];
    alreadyInCartData.push(data);

    localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
  }
  else {
    const findedIndex = alreadyInCartData.findIndex(item => item.name == name);

    if(alreadyInCartData !== null && findedIndex == -1){
      data.count = count;
      data.checked = true;

      alreadyInCartData.push(data);

      localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
    }
    else {
      alreadyInCartData[findedIndex].count += count;
      localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
    }
  }
};

function orderNowButtonHandler() {
  const count = Number(countInput.options[countInput.selectedIndex].value);

  let data = [{
    name,
    price,
    count,
  },]

  localStorage.setItem('order', JSON.stringify(data));
  window.location = '../order-payment/order-payment.html'
}
