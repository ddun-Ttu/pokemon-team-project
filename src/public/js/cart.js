const inCart = document.querySelector(".inCart-productList-ul");
const paymentInformation = document.querySelector(".paymentInformation");
const inCartAndpaymentInformationArea = document.querySelector(
  ".inCartAndpaymentInformation"
);

// * 더미 데이터.

const dummyData = [
  {
    pokemonId: 1,
    pokemonImage: `../img/${this.pokemonName}.png`,
    pokemonName: "이상해씨",
    quantity: 1,
    pokemonPrice: 5000,
    checked: true,

    pokemonNum: 0,
    sumInfo: "",
    detailInfo: "",
    pokemonType: "grass",
  },
  {
    pokemonId: 2,
    pokemonImage: `../img/${this.pokemonName}.png`,
    pokemonName: "피카츄",
    quantity: 1,
    pokemonPrice: 5000,
    checked: true,

    pokemonType: "electric",
    pokemonNum: "",
    sumInfo: "",
    detailInfo: "",
  },
  {
    pokemonId: 3,
    pokemonImage: `../img/${this.pokemonName}.png`,
    pokemonName: "꼬부기",
    quantity: 1,
    pokemonPrice: 5000,
    checked: true,

    pokemonType: "water",
    pokemonNum: 0,
    sumInfo: "",
    detailInfo: "",
  },
  {
    pokemonId: 4,
    pokemonImage: `../img/${this.pokemonName}.png`,
    pokemonName: "메타몽",
    quantity: 1,
    pokemonPrice: 5000,
    checked: true,

    pokemonType: "말랑",
    pokemonNum: 4,
    sumInfo: "",
    detailInfo: "",
  },
];

// * 더미 데이터 삽입 버튼
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");

button1.addEventListener("click", () => {
  let localStorageData = JSON.parse(localStorage.getItem("cart"));

  if (localStorageData == null) {
    localStorageData = [];

    localStorageData.push(dummyData[0]);

    localStorage.setItem("cart", JSON.stringify(localStorageData));
  } else {
    const index = localStorageData.findIndex(({ id }) => id == dummyData[0].id);

    if (index == -1) {
      localStorageData.push(dummyData[0]);
    } else {
      localStorageData[index].quantity += 1;
    }
  }
});

button2.addEventListener("click", () => {
  let localStorageData = JSON.parse(localStorage.getItem("cart"));

  if (localStorageData == null) {
    localStorageData = dummyData;

    localStorage.setItem("cart", JSON.stringify(localStorageData));
  }
});

printInCartAndPaymentInformation();

function printInCartAndPaymentInformation() {
  let localStorageData = JSON.parse(localStorage.getItem("cart"));

  if (localStorageData == null) {
    inCartAndpaymentInformationArea.innerHTML = "장바구니가 비었습니다.";
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
        let { pokemonId, pokemonName, quantity, pokemonPrice, checked } = item;

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
            <a href='/pokemons/${pokemonId}' class="img"><img class="productList-productIamge" src="../img/${pokemonName}.png" alt=""></a>
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
              <div>${pokemonPrice}</div>
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
              <div>${pokemonPrice * quantity}</div>
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
        let { pokemonPrice, quantity, checked } = item;

        if (checked == true) {
          totalProductCount += quantity;
          totalProductPrice += quantity * pokemonPrice;
          deliveryFee += quantity * 5000;
        }

        resultPaymentInformationHTML = `
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
            <div class="container-paymentInformation-totalPrice1">
              <div class="paymentInformation-totalPrice1">총 결제 금액</div>
            </div>
            <div class="container-paymentInformation-totalPrice2">
              <div class="paymentInformation-totalPrice2">${
                totalProductPrice + deliveryFee
              }원</div>
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
    window.location.href = "./orderAndPayment.html";
  }
}
