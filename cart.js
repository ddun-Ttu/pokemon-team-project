const inCart_productList_ul = document.querySelector('.inCart-productList-ul');

for(i = 0; i < 5; i++) {
  inCart_productList_ul.innerHTML += `
    <li class="inCart-productList-li">
      <div class="container-productList-checkbox">
        <input type="checkbox">
      </div>
      <div class="container-productList-productIamge">
        <img class="productList-productIamge" src="./img/이상해씨.png" alt="">
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
      <div class="container-productList-multiple">
        <div class="productList-multiple">X</div>
      </div>
      <div class="container-productList-productNumber">
        <div>상품 개수</div>
      </div>
      <div class="container-productList-equal">
        <div class="productList-equal">=</div>
      </div>
      <div class="container-productList-productTotalPrice">
        <div>총 가격</div>
      </div>
    </li>`
}