/*
<필요한 기능 및 방법>

1. 리스트에서 특정 상품을 클릭했을 때 해당 포켓몬의 상세 페이지로 이동됨. 
  - 데이터를 받아와 리스트 생성 시 a 태그에 해당 포켓몬 정보에 get 요청을 보내는 url이 삽입되어 있을 것.
  - id로 찾을 듯.
  
2. 장바구니, 바로 구매 버튼 클릭 시 기능을 작동시켜야 함. 
  - 장바구니는 아직 구현 안 됨.

3. 포켓몬 이름 옆에 타입 문구/색깔 바꾸기.
  - 데이터만 잘 들어오면 type 데이터로 색을 지정해줄 수 있음.

4. 장바구니/바로 구매 버튼에 이벤트 리스너.
  - 
*/

// @상세 페이지 구현
const detail = document.querySelector('.detail');

const product = {
  image: '../../img/꼬부기.png',
  name: '꼬부기',
  price: 12500,
  description: '등껍질에 숨어 몸을 보호한다. 상대의 빈틈을 놓치지 않고 반격한다.',
  type: '물',
} // 데이터 받았다 치고,

const image = product.image;
const name = product.name;
const type = product.type;
const price = Number(product.price).toLocaleString()
const description = product.description;

let typeColor;

if(type == '물') {
  typeColor = 'blue';  
}
else if(type == '전기') {
  typeColor = 'yellow';
}
else if(type == '풀') {
  typeColor = 'green'
}

detail.innerHTML = 
`
<div class="container-detail-image">
  <div class="detail-image">
    <img class="detail-image-img" src=${image} alt="">
  </div>
</div>
<div class="container-detail-description">
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
      <div class="description-price">${price}원</div>
    </div>
    <div class="container-description-description">
      <div class="description-description">${description}</div>
    </div>
    <div class="container-description-cartAndOrder">
      <div class="container-description-cart">
        <button class="description-cart">장바구니</button>
      </div>
    <div class="container-description-order">
      <button class="description-order">바로 구매</button>
    </div>
`