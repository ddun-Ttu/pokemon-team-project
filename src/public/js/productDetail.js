const detail = document.querySelector('.detail');
const putInCartButton = document.querySelector('.description-cart');
const orderNowButton = document.querySelector('.description-order');
const countInput = document.querySelector('#count');

const product = 
  { 
    // pokemonImage: `../img/${this.pokemonName}.png`,
  pokemonName: '꼬부기',
  pokemonPrice: 12500,
  detailInfo: '등껍질에 숨어 몸을 보호한다. 상대의 빈틈을 놓치지 않고 반격한다.',
  categoryId: '물',

  pokemonId: 0,
  pokemonNum: 0,
  sumInfo: '',
  }

// 데이터 받았다 치고,

let { pokemonImage, pokemonName, categoryId, pokemonPrice, detailInfo, } = product;

pricetoLocaleString = Number(pokemonPrice).toLocaleString()

// { 
//   pokemonImage: `../img/${this.pokemonName}.png`,
//   pokemonName: '이상해씨',
//   quantity: 1,
//   pokemonPrice: 5000,
//   checked: true,

//   pokemonId: 0,
//   pokemonNum: 0,
//   sumInfo: '',
//   detailInfo: '',
//   categoryId: '풀',
// }

let typeColor;
    
switch(categoryId) {
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
  <img class="detail-image-img" src='../img/${pokemonName}.png' alt="">
</div>
`

detailDescriptionOne.innerHTML = 
`
<div class="detail-description">
  <div class="container-description-nameAndType">
    <div class="container-description-name">
      <div class="description-name">${pokemonName}</div>
    </div>
    <div class="container-description-type">
      <div class="description-type" style="background-color: ${typeColor}">${categoryId}</div>
    </div>
  </div>
  <div class="container-description-price">
    <div class="description-price">${pricetoLocaleString}원</div>
  </div>
  <div class="container-description-description">
    <div class="description-description">${detailInfo}</div>
  </div>
</div> 
`

putInCartButton.addEventListener('click', putInCartButtonHandler);

orderNowButton.addEventListener('click', orderNowButtonHandler);

function putInCartButtonHandler() {
  let alreadyInCartData = JSON.parse(localStorage.getItem('cart'));

  const count = Number(countInput.options[countInput.selectedIndex].value);

  let data = {
    pokemonName,
    pokemonPrice,
  }

  if(alreadyInCartData == null) {
    // data 객체에 더해줄 필드.
    data.quantity = count;
    data.checked = true;

    // data 객체에서 빼줄 필드.
    
    alreadyInCartData = [];
    alreadyInCartData.push(data);

    localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
  }
  else {
    const findedIndex = alreadyInCartData.findIndex(item => item.pokemonName == pokemonName);

    if(alreadyInCartData !== null && findedIndex == -1){
      data.quantity = count;
      data.checked = true;

      alreadyInCartData.push(data);

      localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
    }
    else {
      alreadyInCartData[findedIndex].quantity += count;
      localStorage.setItem('cart', JSON.stringify(alreadyInCartData));
    }
  }
};

function orderNowButtonHandler() {
  const count = Number(countInput.options[countInput.selectedIndex].value);
  let quantity = count;

  let data = [{
    pokemonName,
    pokemonPrice,
    quantity,
  },]

  localStorage.setItem('order', JSON.stringify(data));
  window.location = './orderAndPayment.html'
}
