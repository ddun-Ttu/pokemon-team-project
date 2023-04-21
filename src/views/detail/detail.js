  const detail = document.querySelector('.detail');

  const product = {
    image: '../../img/이상해씨.png',
    name: '이상해씨',
    price: 12500,
    description: '등껍질에 숨어 몸을 보호한다. 상대의 빈틈을 놓치지 않고 반격한다.',
    type: '풀',
  }

const image = product.image;
const name = product.name;
const type = product.type;
const price = Number(product.price).toLocaleString()
const description = product.description;

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
        <div class="description-type">${type}</div>
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
