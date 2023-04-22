window.onLoad(() => {
  const localStorageData = JSON.parse(localStorage.getItem('cart'));
  localStorage.setItem('cart', localStorageData)
})

const inCart = document.querySelector('.inCart-productList-ul');
const paymentInformation = document.querySelector('.paymentInformation');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');

const inCartList = [];

for(i = 0; i < 1; i++) {
  inCart.innerHTML += 
  `
  <li class="inCart-productList-li">
    <div class="container-productList-checkbox">
      <input type="checkbox">
    </div>
    <div class="container-productList-productIamge">
      <img class="productList-productIamge" src="../../img/이상해씨.png" alt="">
    </div>
    <div class="container-productList-productNameAndCountHandle">
      <div class="container-productList-productName">
        <div class="productList-productName">상품 이름</div>
      </div>
      <div class="container-productList-countHandle">
        <div>
          <button>-</button>
        </div> 
        <div>
          count
        </div>
        <div>
          <button>+</button>
        </div>
      </div>
    </div>
    <div class="container-productList-productPrice">
      <div>상품 가격</div>
    </div>
    <div class="container-productList-multiplication">
      <div class="productList-multiple">X</div>
    </div>
    <div class="container-productList-productCount">
      <div>상품 개수</div>
    </div>
    <div class="container-productList-equal">
      <div class="productList-equal">=</div>
    </div>
    <div class="container-productList-productTotalPrice">
      <div>총 가격</div>
    </div>
    <div class="container-productList-deleteButton">
      <button>X</button>
    </div>
  </li>
  `
}
  
let data = [];

button1.addEventListener('click', (e) => {
  const data1 = { id: 1,
    name: '이상해씨',
    type: '풀',
    price: 5000,
    count: 1,
  }

  data.push(data1);

  localStorage.setItem('cart', JSON.stringify(data));
})

button2.addEventListener('click', (e) => {
  const data2 = {
    id: 2,
    name: '피카츄',
    type: '전기',
    price: 10000,
    count: 2,  
  }
  
  data.push(data2);
  
  localStorage.setItem('cart', JSON.stringify(data));
})

console.log(data)

const localStorageData = JSON.parse(localStorage.getItem('cart'));

function firstCart() {
  const localStorageData = JSON.parse(localStorage.getItem('cart'));

  localStorage.setItem('cart', localStorageData)
}
console.log(localStorageData);

let totalProductCount = 0;
let totalProductPrice = 0;
let deliveryFee = 0;

localStorageData.forEach(item => {
  const { price, count } = item;
  
  totalProductCount += count;
  totalProductPrice += price;
})

let totalPrice = totalProductPrice + deliveryFee;

const paymentInformationHTML =
  `
  <div class="container-paymentInformation-subject">
    <div class="paymentInformation-subject">결제 정보</div>
  </div>
  <div class="container-paymentInformation-productCount">
    <div class="paymentInformation-productCount1">상품 수</div>
    <div class="paymentInformation-productCount2">${totalProductCount}</div>
  </div>
  <div class="container-paymentInformation-productPrice">
    <div class="paymentInformation-productPrice1">상품 금액</div>
    <div class="paymentInformation-productPrice2">${totalProductPrice}</div>
  </div>
  <div class="container-paymentInformation-deliveryFee">
    <div class="paymentInformation-deliveryFee1">배송비</div>
    <div class="paymentInformation-deliveryFee2">${deliveryFee}</div>
  </div>      
  <div class="container-paymentInformation-totalPrice">
    <div class="paymentInformation-totalPrice1">총 결제 금액</div>
    <div class="paymentInformation-totalPrice2">${totalPrice}원</div>
  </div>     
  <div class="container-paymentInformation-paymentButton">
    <button class="paymentInformation-paymentButton">구매하기</button>
  </div>
  `

  paymentInformation.innerHTML = paymentInformationHTML