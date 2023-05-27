const API_URL = config.apiHost;

const inCartAndpaymentInformationArea = document.querySelector(
  '.inCartAndpaymentInformation',
);
const inCart = document.querySelector('.inCart-productList-ul');
const paymentInformation = document.querySelector('.paymentInformation');

printInCartAndPaymentInformation();

// * 장바구니 상품 정보 & 결제 정보 출력.
function printInCartAndPaymentInformation() {
  const cartData = getCartData();

  if (!isCart(cartData)) {
    printEmptyCartMessageBox();

    return;
  }

  makeInCart();

  makePaymentInformation();

  addEventListenerToEachButton();

  function getCartData() {
    let cartData = JSON.parse(localStorage.getItem('cart'));

    return cartData;
  }

  function isCart(cartData) {
    const data = cartData;
    if (data === null) {
      return false;
    }

    return true;
  }

  function printEmptyCartMessageBox() {
    makeEmptyCartHTML();
    insertEmptyCartHTML();
  }

  function makeEmptyCartHTML() {
    return `<div class="container-emptyCart"><div class="emptyCart">장바구니가 비었습니다.</div></div>`;
  }

  function insertEmptyCartHTML() {
    const emptyCartHTML = makeEmptyCartHTML();

    inCartAndpaymentInformationArea.textContent = '';

    inCartAndpaymentInformationArea.insertAdjacentHTML(
      'beforeend',
      emptyCartHTML,
    );
  }

  function makeInCart() {
    const inCartHTML = makeInCartHTML();

    insertInCartHTML(inCartHTML);
  }

  function makeInCartHTML() {
    let inCartHTML = '';

    cartData.forEach(item => {
      let { _id, img, name, quantity, price, checked } = item;
      console.log(item);

      // 체크박스 상태 변경을 위한 값 할당.
      if (checked == true) {
        checked = 'checked';
      } else {
        checked = '';
      }

      // 장바구니 상품 리스트 템플릿을 가공하여 변수에 쌓음.
      inCartHTML += `
          <li class="inCart-productList-li">
            <div class="container-productList-checkbox">
              <input class="productList-checkbox" type="checkbox" ${checked}>
            </div>
            <div class="container-productList-productIamge">
            <a href='/products/${_id}' class="img"><img class="productList-productIamge" src=${
        API_URL + img
      } onerror="this.onerror=null; this.src='/imgs/모래두지.png';" alt=""></a>
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

    return inCartHTML;
  }

  function insertInCartHTML(inCartHTML) {
    inCart.textContent = '';

    inCart.insertAdjacentHTML('beforeend', inCartHTML);
  }

  function makePaymentInformation() {
    const paymentInformationHTML = makePaymentInformationHTML();
    insertPaymentInformationHTML(paymentInformationHTML);
  }

  function makePaymentInformationHTML() {
    let paymentInformationHTML = '';

    let totalProductCount = 0;
    let totalProductPrice = 0;
    let deliveryFee = 0;

    cartData.forEach(item => {
      let { price, quantity, checked } = item;

      if (checked == true) {
        totalProductCount += quantity;
        totalProductPrice += quantity * price;
        deliveryFee += quantity * 5000;
      }

      paymentInformationHTML = `
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

    return paymentInformationHTML;
  }

  function insertPaymentInformationHTML(paymentInformationHTML) {
    paymentInformation.textContent = '';
    paymentInformation.insertAdjacentHTML('beforeend', paymentInformationHTML);
  }

  function addEventListenerToEachButton() {
    addEventListenerToSetProductQuantityButton();
    addEventListenerToCheckboxButton();
    addEventListenerToDeleteProductButton();
    addEventListenerToDeleteAllProductButton();
    addEventListenerToGoOrderButton();
  }

  function addEventListenerToSetProductQuantityButton() {
    // * 수량 변경 버튼 제작.
    const minusButton = document.querySelectorAll('.minusButton');
    const plusButton = document.querySelectorAll('.plusButton');

    // 마이너스 버튼.
    cartData.forEach((item, index) => {
      minusButton[index].addEventListener('click', () => {
        if (item.quantity == 1) {
          alert('수량 설정은 1 이상만 가능합니다.');
        } else {
          // 클릭 시 상품 데이터의 수량 -1.
          item.quantity--;
        }
        localStorage.setItem('cart', JSON.stringify(cartData));

        // 변경된 데이터 반영을 위한 화면 재출력.
        printInCartAndPaymentInformation();
      });

      // 플러스 버튼.
      plusButton[index].addEventListener('click', () => {
        // 클릭 시 상품 데이터의 수량 +1.
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(cartData));

        // 변경된 데이터 반영을 위한 화면 재출력.
        printInCartAndPaymentInformation();
      });
    });
  }

  function addEventListenerToCheckboxButton() {
    // * 체크박스 기능 제작.
    const checkbox = document.querySelectorAll('.productList-checkbox');

    const superCheckbox = document.querySelector(
      '.head-selectAllAndcancleAllCheckbox',
    );

    let trueCheckboxCount = 0;

    cartData.forEach((item, index) => {
      const eachCheckbox = checkbox[index];

      if (eachCheckbox.checked == true) {
        trueCheckboxCount++;
        if (trueCheckboxCount == cartData.length) {
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
          localStorage.setItem('cart', JSON.stringify(cartData));

          // 변경된 데이터 반영을 위한 화면 재출력.
          printInCartAndPaymentInformation();
        } else if (eachCheckbox.checked == true) {
          item.checked = true;

          localStorage.setItem('cart', JSON.stringify(cartData));

          printInCartAndPaymentInformation();
        }
      });
    });

    superCheckbox.addEventListener('click', superCheckboxHandler);

    function superCheckboxHandler() {
      if (superCheckbox.checked == false) {
        superCheckbox.checked = false;

        cartData.forEach((item, index) => {
          item.checked = false;
          checkbox[index].checked = false;
        });
      } else if (superCheckbox.checked == true) {
        superCheckbox.checked = true;

        cartData.forEach((item, index) => {
          item.checked = true;
          checkbox[index].checked = true;
        });
      }

      // 변경된 데이터로 장바구니 데이터 재설정.
      localStorage.setItem('cart', JSON.stringify(cartData));

      // 변경된 데이터 반영을 위한 화면 재출력.
      printInCartAndPaymentInformation();
    }
  }

  function addEventListenerToDeleteProductButton() {
    // * 삭제 버튼 기능 제작.
    const deleteButton = document.querySelectorAll('.productList-deleteButton');

    cartData.forEach((item, index) => {
      const eachDeleteButton = deleteButton[index];

      eachDeleteButton.addEventListener('click', e => {
        const target = e.target;

        // 마지막 데이터를 삭제할 땐 cart 데이터 저장소 자체를 제거.
        // 빈 배열이라도 남아 있으면 메세지 박스가 출력되지 않을 테니까.
        if (cartData.length == 1) {
          localStorage.removeItem('cart');
        } else {
          cartData.splice(index, 1);
          localStorage.setItem('cart', JSON.stringify(cartData));
        }

        printInCartAndPaymentInformation();
      });
    });
  }

  function addEventListenerToDeleteAllProductButton() {
    const deleteAllButton = document.querySelector('.head-deleteAllButton');

    deleteAllButton.addEventListener('click', () => {
      localStorage.removeItem('cart');

      printInCartAndPaymentInformation();
    });
  }

  function addEventListenerToGoOrderButton() {
    const goOrderButton = document.querySelector(
      '.paymentInformation-paymentButton',
    );

    goOrderButton.addEventListener('click', goOrderButtonHandler);

    function goOrderButtonHandler() {
      window.location.href = '/order';
    }
  }
}
