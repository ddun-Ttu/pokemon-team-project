// test

const productList_list_ul = document.querySelector('.productList-list-ul');

const data = [];

const product = {
  image: './img/이상해씨.png',
  name: '이상해씨',
  price: 12500,
  type: '풀',
}

for(i = 0; i < 50; i++) {
  data.push(product);
}

for(i = 0; i < data.length; i++) {
  let { image, name, price, type } = data[i];
  price = Number(price).toLocaleString();

  productList_list_ul.innerHTML += 
    `<li class="productList-list-li">
      <a href="">
        <div class="container-productList-list-image">
          <img class="productList-list-image" src=${image} alt="">
        </div>
        <div class="container-productList-list-description">
          <div class="container-productList-list-description-name">
            <div class="productList-list-description-name">${name}</div>
          </div>
          <div class="container-productList-list-description-price">
            <div class="productList-list-description-price">${price}원</div>
          </div>
          <div class="container-productList-list-description-type">
            <div class="productList-list-description-type">${type}</div>
            <div class="productList-list-description-type2">타입2</div>
          </div> 
        </div>
      </a>
      <div class="container-productList-list-description-like">
        <button class="productList-list-button">찜하기</button>
      </div>
    </li>`
}