const inCartAndpaymentInformationArea = document.querySelector(
  '.inCartAndpaymentInformation',
);
const inCart = document.querySelector('.inCart-productList-ul');
const paymentInformation = document.querySelector('.paymentInformation');

printInCartAndPaymentInformation();

// * 장바구니 상품 정보 & 결제 정보 출력.
function printInCartAndPaymentInformation() {
  // 로컬 스토리지에서 장바구니 상품 정보를 꺼내옴.
  let localStorageData = JSON.parse(localStorage.getItem('cart'));

  // 장바구니가 비어 있을 때.
  if (localStorageData == null) {
    // 메세지 박스 출력.
    inCartAndpaymentInformationArea.innerHTML = `<div class="container-emptyCart"><div class="emptyCart">장바구니가 비었습니다.</div></div>`;
    return;
    // 장바구니에 상품이 있을 때.
  } else {
    // 장바구니 상품 리스트 출력.
    makeInCart();

    // 장바구니 상품에 대한 결제 정보 출력.
    makePaymentInformation();

    // * 장바구니 상품 리스트 출력 함수.
    function makeInCart() {
      let resultInCartHTML = '';

      localStorageData.forEach((item, index) => {
        let { _id, img, name, quantity, price, checked } = item;

        // 체크박스 상태 변경을 위한 값 할당.
        if (checked == true) {
          checked = 'checked';
        } else {
          checked = '';
        }

        // 장바구니 상품 리스트 템플릿을 가공하여 변수에 쌓음.
        resultInCartHTML += `
          <li class="inCart-productList-li">
            <div class="container-productList-checkbox">
              <input class="productList-checkbox" type="checkbox" ${checked}>
            </div>
            <div class="container-productList-productIamge">
            <a href='/pokemons/${_id}' class="img"><img class="productList-productIamge" src=${img} onerror="this.onerror=null; this.src='/imgs/모래두지.png';" alt=""></a>
            </div>
            <div class="container-productList-productNameAndCountHandle">
              <div class="container-productList-productName">
              <div class="productList-productName">${name}</div>
              </div>
              <div class="container-productList-countHandle">
                <div>
                  <button class="minusButton">-</button>
                </div> 
                <div>
                  ${quantity}
                </div>
                <div>
                  <button class="plusButton">+</button>
                </div>
              </div>
            </div>
            <div class="container-productList-productPrice">
              <div>${price.toLocaleString()}</div>
            </div>
            <div class="container-productList-multiplication">
              <div class="productList-multiple">X</div>
            </div>
            <div class="container-productList-productCount">
              <div>${quantity}</div>
            </div>
            <div class="container-productList-equal">
              <div class="productList-equal">=</div>
            </div>
            <div class="container-productList-productTotalPrice">
              <div>${(price * quantity).toLocaleString()}</div>
            </div>
            <div class="container-productList-deleteButton">
              <button class="productList-deleteButton">삭제</button>
            </div>
          </li>
          `;
      });

      inCart.innerHTML = resultInCartHTML;
    }

    // 장바구니 상품에 대한 결제 정보 출력 함수.
    function makePaymentInformation() {
      let resultPaymentInformationHTML = '';

      let totalProductCount = 0;
      let totalProductPrice = 0;
      let deliveryFee = 0;

      localStorageData.forEach(item => {
        let { price, quantity, checked } = item;

        if (checked == true) {
          totalProductCount += quantity;
          totalProductPrice += quantity * price;
          deliveryFee += quantity * 5000;
        }

        resultPaymentInformationHTML = `
          <div class="container-paymentInformation-subject">
            <div class="paymentInformation-subject">결제 정보</div>
          </div>
          <div class="container-paymentInformation-productCount">
            <div class="paymentInformation-productCount1">상품 수</div>
            <div class="paymentInformation-productCount2">${totalProductCount}개</div>
          </div>
          <div class="container-paymentInformation-productPrice">
            <div class="paymentInformation-productPrice1">상품 금액</div>
            <div class="paymentInformation-productPrice2">${totalProductPrice.toLocaleString()}원</div>
          </div>
          <div class="container-paymentInformation-deliveryFee">
            <div class="paymentInformation-deliveryFee1">배송비</div>
            <div class="paymentInformation-deliveryFee2">${deliveryFee.toLocaleString()}원</div>
          </div>      
          <div class="container-paymentInformation-totalPrice">
            <div class="container-paymentInformation-totalPrice1">
              <div class="paymentInformation-totalPrice1">총 결제 금액</div>
            </div>
            <div class="container-paymentInformation-totalPrice2">
              <div class="paymentInformation-totalPrice2">${(
                totalProductPrice + deliveryFee
              ).toLocaleString()}원</div>
            </div>
          </div>     
          <div class="container-paymentInformation-paymentButton">
            <button class="paymentInformation-paymentButton">구매하기</button>
          </div>
          `;
      });
      paymentInformation.innerHTML = resultPaymentInformationHTML;
    }
  }

  // * 수량 변경 버튼 제작.
  const minusButton = document.querySelectorAll('.minusButton');
  const plusButton = document.querySelectorAll('.plusButton');

  // 마이너스 버튼.
  localStorageData.forEach((item, index) => {
    minusButton[index].addEventListener('click', () => {
      if (item.quantity == 1) {
        alert('수량 설정은 1 이상만 가능합니다.');
      } else {
        // 클릭 시 상품 데이터의 수량 -1.
        item.quantity--;
      }
      localStorage.setItem('cart', JSON.stringify(localStorageData));

      // 변경된 데이터 반영을 위한 화면 재출력.
      printInCartAndPaymentInformation();
    });

    // 플러스 버튼.
    plusButton[index].addEventListener('click', () => {
      // 클릭 시 상품 데이터의 수량 +1.
      item.quantity++;
      localStorage.setItem('cart', JSON.stringify(localStorageData));

      // 변경된 데이터 반영을 위한 화면 재출력.
      printInCartAndPaymentInformation();
    });
  });

  // * 체크박스 기능 제작.
  const checkbox = document.querySelectorAll('.productList-checkbox');

  const superCheckbox = document.querySelector(
    '.head-selectAllAndcancleAllCheckbox',
  );

  let trueCheckboxCount = 0;

  localStorageData.forEach((item, index) => {
    const eachCheckbox = checkbox[index];

    if (eachCheckbox.checked == true) {
      trueCheckboxCount++;
      if (trueCheckboxCount == localStorageData.length) {
        superCheckbox.checked = true;
      } else {
        superCheckbox.checked = false;
      }
    }

    // 체크박스 상태 조정에 따라 결제 정보 편입 상품 판별.
    eachCheckbox.addEventListener('click', () => {
      if (eachCheckbox.checked == false) {
        item.checked = false;

        // 해당 상품의 장바구니 데이터 재설정.
        localStorage.setItem('cart', JSON.stringify(localStorageData));

        // 변경된 데이터 반영을 위한 화면 재출력.
        printInCartAndPaymentInformation();
      } else if (eachCheckbox.checked == true) {
        item.checked = true;

        localStorage.setItem('cart', JSON.stringify(localStorageData));

        printInCartAndPaymentInformation();
      }
    });
  });

  superCheckbox.addEventListener('click', superCheckboxHandler);

  function superCheckboxHandler() {
    if (superCheckbox.checked == false) {
      superCheckbox.checked = false;

      localStorageData.forEach((item, index) => {
        item.checked = false;
        checkbox[index].checked = false;
      });
    } else if (superCheckbox.checked == true) {
      superCheckbox.checked = true;

      localStorageData.forEach((item, index) => {
        item.checked = true;
        checkbox[index].checked = true;
      });
    }

    // 변경된 데이터로 장바구니 데이터 재설정.
    localStorage.setItem('cart', JSON.stringify(localStorageData));

    // 변경된 데이터 반영을 위한 화면 재출력.
    printInCartAndPaymentInformation();
  }

  // * 삭제 버튼 기능 제작.
  const deleteButton = document.querySelectorAll('.productList-deleteButton');

  localStorageData.forEach((item, index) => {
    const eachDeleteButton = deleteButton[index];

    eachDeleteButton.addEventListener('click', e => {
      const target = e.target;

      // 마지막 데이터를 삭제할 땐 cart 데이터 저장소 자체를 제거.
      // 빈 배열이라도 남아 있으면 메세지 박스가 출력되지 않을 테니까.
      if (localStorageData.length == 1) {
        localStorage.removeItem('cart');
      } else {
        localStorageData.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(localStorageData));
      }

      printInCartAndPaymentInformation();
    });
  });

  const deleteAllButton = document.querySelector('.head-deleteAllButton');

  deleteAllButton.addEventListener('click', () => {
    localStorage.removeItem('cart');

    printInCartAndPaymentInformation();
  });

  const goOrderButton = document.querySelector(
    '.paymentInformation-paymentButton',
  );

  goOrderButton.addEventListener('click', goOrderButtonHandler);

  async function goOrderButtonHandler() {
    window.location.href = '/order';
  }
}
