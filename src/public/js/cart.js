const inCart = document.querySelector(".inCart-productList-ul");
const paymentInformation = document.querySelector(".paymentInformation");
const inCartAndpaymentInformationArea = document.querySelector(
  ".inCartAndpaymentInformation"
);

printInCartAndPaymentInformation();

function printInCartAndPaymentInformation() {
  let localStorageData = JSON.parse(localStorage.getItem("cart"));

  if (localStorageData == null) {
    inCartAndpaymentInformationArea.innerHTML = `<div class="container-emptyCart"><div class="emptyCart">장바구니가 비었습니다.</div></div>`;
    return;
  } else {
    let resultInCartHTML = "";

    makeInCartHTML();

    inCart.innerHTML = resultInCartHTML;

    let resultPaymentInformationHTML = "";

    let totalProductCount = 0;
    let totalProductPrice = 0;
    let deliveryFee = 0;

    makePaymentInformationHTML();

    paymentInformation.innerHTML = resultPaymentInformationHTML;

    // * inCartHTML 차례대로 배열에 넣기(루프 이용).
    function makeInCartHTML() {
      // 현재 로컬스토리지에 데이터가 세팅되어 있는 상황.
      // 그 데이터 각각과 HTML 템플릿을 합성한 결과물을 배열 안에 모아주면 된다.
      // 출력 횟수를 줄이는 게 좋으니까 변수에 할당하고 마지막에 innerHTML로 조작.

      localStorageData.forEach((item, index) => {
        let { _id, pokemonImage, pokemonName, quantity, price, checked } = item;

        if (checked == true) {
          checked = "checked";
        } else {
          checked = "";
        }

        resultInCartHTML += `
          <li class="inCart-productList-li">
            <div class="container-productList-checkbox">
              <input class="productList-checkbox" type="checkbox" ${checked}>
            </div>
            <div class="container-productList-productIamge">
            <a href='/pokemons/${_id}' class="img"><img class="productList-productIamge" src=${pokemonImage} onerror="this.onerror=null; this.src='../img/피카츄.png';" alt=""></a>
            </div>
            <div class="container-productList-productNameAndCountHandle">
              <div class="container-productList-productName">
              <div class="productList-productName">${pokemonName}</div>
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
    }

    function makePaymentInformationHTML() {
      localStorageData.forEach((item) => {
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
    }
  }

  const minusButton = document.querySelectorAll(".minusButton");
  const plusButton = document.querySelectorAll(".plusButton");

  localStorageData.forEach((item, index) => {
    minusButton[index].addEventListener("click", () => {
      if (item.quantity == 1) {
        alert("수량 설정은 1 이상만 가능합니다.");
      } else {
        item.quantity--;
      }
      localStorage.setItem("cart", JSON.stringify(localStorageData));
      printInCartAndPaymentInformation();
    });

    plusButton[index].addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(localStorageData));
      printInCartAndPaymentInformation();
    });
  });

  const checkbox = document.querySelectorAll(".productList-checkbox");
  const superCheckbox = document.querySelector(
    ".head-selectAllAndcancleAllCheckbox"
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

    eachCheckbox.addEventListener("click", () => {
      if (eachCheckbox.checked == false) {
        item.checked = false;

        localStorage.setItem("cart", JSON.stringify(localStorageData));
        printInCartAndPaymentInformation();
      } else if (eachCheckbox.checked == true) {
        item.checked = true;

        localStorage.setItem("cart", JSON.stringify(localStorageData));
        printInCartAndPaymentInformation();
      }
    });
  });

  superCheckbox.addEventListener("click", superCheckboxHandler);

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

    localStorage.setItem("cart", JSON.stringify(localStorageData));

    printInCartAndPaymentInformation();
  }

  const deleteButton = document.querySelectorAll(".productList-deleteButton");

  localStorageData.forEach((item, index) => {
    const eachDeleteButton = deleteButton[index];

    eachDeleteButton.addEventListener("click", (e) => {
      const target = e.target;

      if (localStorageData.length == 1) {
        localStorage.removeItem("cart");
      } else {
        localStorageData.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(localStorageData));
      }

      printInCartAndPaymentInformation();
    });
  });

  const deleteAllButton = document.querySelector(".head-deleteAllButton");

  deleteAllButton.addEventListener("click", () => {
    localStorage.removeItem("cart");

    printInCartAndPaymentInformation();
  });

  const goOrderButton = document.querySelector(
    ".paymentInformation-paymentButton"
  );

  goOrderButton.addEventListener("click", goOrderButtonHandler);

  async function goOrderButtonHandler() {
    window.location.href = "/orders";
  }
}
