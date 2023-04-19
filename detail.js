  const container_detail = document.querySelector('.container-detail');

  const product = {
    image: './img/이상해씨.png',
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


container_detail.innerHTML = 
`
<div class="container-detail-image">
  <img class="detail-image" src=${image} alt="">
  </div>
  <div class="container-detail-description">
  <div class="container-detail-description-nameAndType">
    <div class="container-detail-description-name">
      <div class="detail-description-name">${name}</div>
    </div>
    <div class="container-detail-description-type">
      <div class="detail-description-type">${type}</div>
    </div>
  </div>
  <div class="container-detail-description-price">
    <div class="detail-description-price">${price}원</div>
  </div>
  <div class="container-detail-description-description">
    <div class="detail-description-description">${description}</div>
  </div>
  <div class="container-detail-description-cartAndOrder">
    <div class="container-detail-description-cart">
      <div class="detail-description-cart">장바구니</div>
    </div>
    <div class="container-detail-description-order">
      <div class="detail-description-order">바로 구매</div>
    </div>
  </div>
</div>`
