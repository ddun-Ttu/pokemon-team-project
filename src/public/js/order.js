const dummy = {
  categoryNameData: [
    { main: '포켓몬', sub: ['물', '불', '풀', '전기'] },
    { main: '몬스터볼' },
    { main: '사료' },
    { main: '진화의 돌' },
    { main: '악세서리' },
    { main: '인형' },
  ],
  productData: [
    {
      _id: 1,
      img: 'url',
      name: '꼬부기',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 2,
      img: 'url',
      name: '메타몽',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 3,
      img: 'url',
      name: '이상해씨',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 4,
      img: 'url',
      name: '피카츄',
      price: 1000,
      categoryName: '포켓몬',
      stock: 0,
    },
    {
      _id: 5,
      img: 'url',
      name: '몬스터볼',
      price: 1000,
      categoryName: '몬스터볼',
      stock: 20,
    },
    {
      _id: 6,
      img: 'url',
      name: '메타몽',
      price: 1000,
      categoryName: '포켓몬',
      stock: 0,
    },
    {
      _id: 7,
      img: 'url',
      name: '몬스터볼',
      price: 1000,
      categoryName: '몬스터볼',
      stock: 20,
    },
    {
      _id: 8,
      img: 'url',
      name: '피카츄',
      price: 1000,
      categoryName: '포켓몬',
      stock: 20,
    },
  ],
};

// * paymentInformation
const productNameAndProductCountArea = document.querySelector(
  '.paymentInformation-NameAndCountList-list-ul',
);
const productTotalPriceArea = document.querySelector(
  '.paymentInformation-productTotalPrice',
);
const deliveryFeeArea = document.querySelector(
  '.paymentInformation-deliveryFee-deliveryFee',
);
const finalPriceArea = document.querySelector('.paymentInformation-finalPrice');

const searchAddressButton = document.querySelector('#searchAddressButton');

// * 상세 페이지에서 넘어왔는지 장바구니에서 넘어왔는지 구분 작업.
// - 상세 페이지 출신이면 로컬 스토리지에 'order' 데이터가 존재할 것.
// - 'order'가 없어도 장바구니에서 넘어온 'cart' 데이터가 존재할 것.
const localStorageCartData = JSON.parse(localStorage.getItem('cart'));

const localStorageOrderData = JSON.parse(localStorage.getItem('order'));

let orderData;

// * 주문/결제 페이지에서 다룰 상품 데이터 판별.
// - cart(장바구니) or order(바로 구매).
if (localStorageCartData == null && localStorageOrderData == null) {
  alert('잘못된 접근입니다.');
} else if (localStorageOrderData !== null) {
  orderData = localStorageOrderData;
} else {
  // 장바구니에서 체크된 상품으로만 결제 정보 구성.
  orderData = localStorageCartData.filter(item => {
    return item.checked == true;
  });
}

let dataProductTotalPrice;
let dataDeliveryFee;
let dataFinalPrice;

let productListHTML = '';
let productTotalPrice = 0;
let deliveryFee = 0;

orderData.forEach((item, index) => {
  let { name, quantity, price } = item;

  productListHTML += `
    <li>
        <div>${name} / ${quantity}개</div>
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
searchAddressButton.addEventListener('click', searchAddress);

function searchAddress(e) {
  e.preventDefault();
  // new daum.Postcode({
  //   oncomplete: function (data) {
  //     let addr = '';
  //     let extraAddr = '';

  //     if (data.userSelectedType === 'R') {
  //       addr = data.roadAddress;
  //     } else {
  //       addr = data.jibunAddress;
  //     }

  //     if (data.userSelectedType === 'R') {
  //       if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
  //         extraAddr += data.bname;
  //       }
  //       if (data.buildingName !== '' && data.apartment === 'Y') {
  //         extraAddr +=
  //           extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
  //       }
  //       if (extraAddr !== '') {
  //         extraAddr = ' (' + extraAddr + ')';
  //       }
  //     } else {
  //     }

  //     postalCodeInput.value = data.zonecode;
  //     address1Input.value = `${addr} ${extraAddr}`;
  //     address2Input.placeholder = '상세 주소를 입력해 주세요.';
  //     address2Input.focus();
  //   },
  // }).open();
  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ''; // 주소 변수
      var extraAddr = ''; // 참고항목 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
        // 조합된 참고항목을 해당 필드에 넣는다.
        document.getElementById('ddd').value = extraAddr;
      } else {
        document.getElementById('ddd').value = '';
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      document.getElementById('postalCode').value = data.zonecode;
      document.getElementById('address1').value = addr;
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById('address2').focus();
    },
  }).open();
}

// * 구매하기 버튼 클릭 시 배송지 & 주문 상품 데이터 서버로 전송.
const receiverNameInput = document.querySelector('#receiverName');
const receiverPhoneNumberInput = document.querySelector('#receiverPhoneNumber');
const postalCodeInput = document.querySelector('#postalCode');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const requestSelectBox = document.querySelector('#requestSelectBox');

const orderButton = document.querySelector('#orderButton');

orderButton.addEventListener('click', orderButtonHandler);

function orderButtonHandler() {
  const result = confirm('주문을 진행합니다.');

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

  const userId = '유저 정보';
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

  orderData.forEach(item => {
    const { _id, quantity } = item;

    orderProductData.push({ _id, quantity });
  });

  // 주문 상품 정보를 배송지 정보에 필드값으로 삽입.
  data.orderProductData = orderProductData;

  // const dataJson = JSON.stringify(data);

  // const apiUrl = `${common.API_URL}/orders`;

  // const res = await fetch(apiUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: dataJson,
  // });

  // * 주문 성공/실패.
  // if (res.ok) {
  // 지금 전송 구현이 안 돼서 임시로 true 지정.
  if (true) {
    if (localStorageOrderData !== null) {
      localStorage.removeItem('order');
    } else {
      const checkedFalseCartData = localStorageCartData.filter(item => {
        return item.checked == false;
      });
      if (checkedFalseCartData.length == 0) {
        localStorage.removeItem('cart');
      } else {
        localStorage.setItem('cart', JSON.stringify(checkedFalseCartData));
      }
    }

    window.location.replace('./orderComplete.html');
  } else {
    console.log(res.status);
    alert('주문 실패. 다시 시도해주세요.');
  }
}

// * 페이지 이동(구매 버튼 클릭이 아닌 다른 방법으로) 시 로컬 스토리지의 order 데이터 삭제.
// - 이 데이터를 삭제하지 않으면 장바구니에서 넘어와도 오더 데이터가 잡히게 됨.
// - cart 데이터는 남기기. cart 데이터는 주문 버튼 클릭으로 주문 완료 시에만 주문한 목록 삭제.
window.addEventListener('unload', () => {
  localStorage.removeItem('order');
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
