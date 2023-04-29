// * paymentInformation
const productNameAndProductCountArea = document.querySelector(
  ".paymentInformation-NameAndCountList-list-ul"
);
const productTotalPriceArea = document.querySelector(
  ".paymentInformation-productTotalPrice"
);
const deliveryFeeArea = document.querySelector(
  ".paymentInformation-deliveryFee-deliveryFee"
);
const finalPriceArea = document.querySelector(".paymentInformation-finalPrice");

// * 상세 페이지에서 넘어왔는지 장바구니에서 넘어왔는지 구분 작업.
// - 상세 페이지 출신이면 로컬 스토리지에 'order' 데이터가 존재할 것.
// - 'order'가 없어도 장바구니에서 넘어온 'cart' 데이터가 존재할 것.
const localStorageCartData = JSON.parse(localStorage.getItem("cart"));

const localStorageOrderData = JSON.parse(localStorage.getItem("order"));

let orderData;

// * 주문/결제 페이지에서 다룰 상품 데이터 판별.
// - cart(장바구니) or order(바로 구매).
if (localStorageCartData == null && localStorageOrderData == null) {
  alert("잘못된 접근입니다.");
} else if (localStorageOrderData !== null) {
  orderData = localStorageOrderData;
} else {
  // 장바구니에서 체크된 상품으로만 결제 정보 구성.
  orderData = localStorageCartData.filter((item) => {
    return item.checked == true;
  });
}

let dataProductTotalPrice;
let dataDeliveryFee;
let dataFinalPrice;

let productListHTML = "";
let productTotalPrice = 0;
let deliveryFee = 0;

orderData.forEach((item, index) => {
  let { pokemonName, quantity, price } = item;

  productListHTML += `
    <li>
        <div>${pokemonName} / ${quantity}개</div>
    </li>
    `;

  productTotalPrice += quantity * price;
  deliveryFee += quantity * 5000;

  if (index == orderData.length - 1) {
    const finalPrice = productTotalPrice + deliveryFee;

    productNameAndProductCountArea.innerHTML = productListHTML;
    productTotalPriceArea.innerHTML = `${productTotalPrice.toLocaleString()}원`;
    deliveryFeeArea.innerHTML = `${deliveryFee.toLocaleString()}원`;
    finalPriceArea.innerHTML = `${finalPrice.toLocaleString()}원`;
  }
});

// * 배송지 찾기 버튼 제작.
// - 마지막 단계에서 클릭 시 지정된 칸으로 들어가질 않음.
const searchAddressButton = document.querySelector("#searchAddressButton");

searchAddressButton.addEventListener("click", searchAddress);

function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = "";
      let extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = "상세 주소를 입력해 주세요.";
      address2Input.focus();
    },
  }).open();
}

// * 구매하기 버튼 클릭 시 배송지 & 주문 상품 데이터 서버로 전송.
const receiverNameInput = document.querySelector("#receiverName");
const receiverPhoneNumberInput = document.querySelector("#receiverPhoneNumber");
const postalCodeInput = document.querySelector("#postalCode");
const address1Input = document.querySelector("#address1");
const address2Input = document.querySelector("#address2");
const requestSelectBox = document.querySelector("#requestSelectBox");

const orderButton = document.querySelector("#orderButton");

orderButton.addEventListener("click", orderButtonHandler);

function orderButtonHandler() {
  const result = confirm("주문을 진행합니다.");

  if (result) {
    // 입력받은 배송지 정보 체크.
    checkDeliveryData();

    // 서버로 주문 데이터(배송지 & 주문 상품 정보) 전송.
    makeAndSendOrderData();
  }
}

// * 배송지 정보 확인 & 데이터 제작 & 데이터 전송.
async function checkDeliveryData() {
  const receiver = receiverNameInput.value;
  const phoneNumber = receiverPhoneNumberInput.value;
  const postalCode = postalCodeInput.value;
  const address2 = address2Input.value;

  // 주소 찾기 버튼이 안 돼서 일단 검사 과정은 생략시켜놓음.
  // if (!receiver || !phoneNumber || !postalCode || !address2) {
  //   return alert("배송지 정보를 모두 입력해 주세요.");
  // }
}

// * 서버로 보낼 데이터 제작 & 전송.
async function makeAndSendOrderData() {
  // * 배송지 정보 데이터 제작.

  // 로그인 시 로컬 스토리지에 유저 정보를 저장하는 기능은 나중에 구현.
  // const userId =
  //   JSON.parse(localStorage.getItem('user')).userId;

  const userId = "유저 정보";
  const receiver = receiverNameInput.value;
  const phoneNumber = receiverPhoneNumberInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const request = requestSelectBox.value;

  const data = {
    userId,
    receiver,
    phoneNumber,
    postalCode,
    address1,
    address2,
    request,
  };

  // * 주문 정보 데이터 제작.
  let orderProductData = [];

  orderData.forEach((item) => {
    const { _id, quantity } = item;

    orderProductData.push({ _id, quantity });
  });

  // 주문 상품 정보를 배송지 정보에 필드값으로 삽입.
  data.orderProductData = orderProductData;

  const dataJson = JSON.stringify(data);

  const apiUrl = `${common.API_URL}/orders`;

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: dataJson,
  });

  // * 주문 성공/실패.
  // if (res.ok) {
  // 지금 전송 구현이 안 돼서 임시로 true 지정.
  if (true) {
    if (localStorageOrderData !== null) {
      localStorage.removeItem("order");
    } else {
      const checkedFalseCartData = localStorageCartData.filter((item) => {
        return item.checked == false;
      });
      if (checkedFalseCartData.length == 0) {
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(checkedFalseCartData));
      }
    }

    window.location.replace("./orderComplete.html");
  } else {
    console.log(res.status);
    alert("주문 실패. 다시 시도해주세요.");
  }
}

// * 페이지 이동(구매 버튼 클릭이 아닌 다른 방법으로) 시 로컬 스토리지의 order 데이터 삭제.
// - 이 데이터를 삭제하지 않으면 장바구니에서 넘어와도 오더 데이터가 잡히게 됨.
// - cart 데이터는 남기기. cart 데이터는 주문 버튼 클릭으로 주문 완료 시에만 주문한 목록 삭제.
window.addEventListener("unload", () => {
  localStorage.removeItem("order");
});

// * 앞으로/뒤로 가기 등으로 접근하면 안내 문구 출력.
// window.onpageshow = function(event){
//   if(event.persisted || (window.performance && window.performance.navigation.type == 2)){
//     document.write('잘못된 접근입니다!!!');
//   }
// };

// // * 새로 고침, 뒤로 가기 등 브라우저 이벤트 방지.
// window.addEventListener('beforeunload', (event) => {
//   event.preventDefault();
//   event.returnValue = '';
// });
