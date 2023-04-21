// test

const productListByCategory_list_ul = document.querySelector('.productListByCategory-list-ul');

const data = [];

const product = {
  image: '../../img/이상해씨.png',
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

  productListByCategory_list_ul.innerHTML += 
    `<li class="productListByCategory-list-li">
      <a href="">
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
            <div class="productListByCategory-list-description-type">${type}</div>
            <div class="productListByCategory-list-description-type2">타입2</div>
          </div> 
        </div>
      </a>
      <div class="container-productListByCategory-list-description-like">
        <button class="productListByCategory-list-like-button">찜하기</button>
      </div>
    </li>`
}