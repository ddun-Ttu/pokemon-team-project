// * 앞으로/뒤로 가기 등으로 접근하면 안내 문구 출력.
window.onpageshow = function(event){
  if(event.persisted || (window.performance && window.performance.navigation.type == 2)){
    document.write('잘못된 접근입니다!!!');
  }
};

// // * 새로 고침, 뒤로 가기 등 브라우저 이벤트 방지.
// window.addEventListener('beforeunload', (event) => {
//   event.preventDefault();
//   event.returnValue = '';
// });

// * 페이지 이동(구매 버튼 클릭이 아닌 다른 방법으로) 시 로컬 스토리지의 order 데이터 삭제.
// - 이 데이터를 삭제하지 않으면 장바구니에서 넘어와도 오더 데이터가 잡히게 됨.
// - cart 데이터는 남기기. cart 데이터는 주문 버튼 클릭으로 주문 완료 시에만 주문한 목록 삭제. 
window.addEventListener('unload', () => {
  localStorage.removeItem('order');
})

// * paymentInformation
const productNameAndProductCountArea = 
  document.querySelector('.paymentInformation-NameAndCountList-list-ul');
const productTotalPriceArea = 
  document.querySelector('.paymentInformation-productTotalPrice');
const deliveryFeeArea = 
  document.querySelector('.paymentInformation-deliveryFee-deliveryFee');
const finalPriceArea = 
  document.querySelector('.paymentInformation-finalPrice');

// * 상세 페이지에서 넘어왔는지 장바구니에서 넘어왔는지 구분 작업.
// - 상세 페이지 출신이면 로컬 스토리지에 'order' 데이터가 존재할 것.
// - 'order'가 없어도 장바구니에서 넘어온 'cart' 데이터는 존재 있을 것. 
const localStorageCartData = JSON.parse(localStorage.getItem('cart'));
const localStorageOrderData = JSON.parse(localStorage.getItem('order'));

// 더미데이터
// localStorage.setItem('order', JSON.stringify(
//   [{ id: 1,
//   name: '이상해씨',
//   type: '풀',
//   price: 5000,
//   count: 1,
//   checked: true }]
//   ))

let orderData;

if(localStorageCartData == null && localStorageOrderData == null) {
  alert('잘못된 접근입니다.');
  // 허용해선 안 될 방법으로 접근 시 출력될 페이지를 하나 만들어야겠음.
}
else if(localStorageOrderData !== null) {
  orderData = localStorageOrderData;
}
else {
  orderData = localStorageCartData.filter(item => {
    return item.checked == true;
  });
}

// let dataName = [];
// let dataCount = [];
let dataProductTotalPrice;
let dataDeliveryFee;
let dataFinalPrice;

let productListHTML = '';
let productTotalPrice = 0;

orderData.forEach((item, index) => {
  
  let { name, count, price, deliveryFee = 3000 } = item;

  productListHTML += 
    `
    <li>
        <div>${name} / ${count}개</div>
    </li>
    `;

  productTotalPrice += count * price;

  // dataName.push(name);
  // dataCount.push(count);
  
  if(index == orderData.length - 1) {
    const finalPrice = productTotalPrice + deliveryFee;

    productNameAndProductCountArea.innerHTML = productListHTML;    
    productTotalPriceArea.innerHTML = productTotalPrice;
    deliveryFeeArea.innerHTML = deliveryFee;
    finalPriceArea.innerHTML = finalPrice;
    
    dataProductTotalPrice = productTotalPrice;
    dataDeliveryFee = deliveryFee;
    dataFinalPrice = finalPrice;
  }
})

// * 배송지 찾기 버튼 제작.
const searchAddressButton = document.querySelector('#searchAddressButton');

searchAddressButton.addEventListener('click', searchAddress);

function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';


      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
};

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
  // 입력받은 배송지 정보 체크.
  checkDeliveryData()

  // 서버로 주문 데이터 전송.
  makeAndSendOrderData()
}

// * 배송지 정보 확인 & 데이터 제작 & 데이터 전송.
async function checkDeliveryData() {
  const receiverName = receiverNameInput.value;
  const receiverPhoneNumber = receiverPhoneNumberInput.value;
  const postalCode = postalCodeInput.value;
  // const address1 = address1Input.value;
  const address2 = address2Input.value;
  // const request = requestSelectBox.value;

  // if (!receiverName || !receiverPhoneNumber || !postalCode || !address2) {
  //   return alert("배송지 정보를 모두 입력해 주세요.")
  // };
};

// * 서버로 보낼 데이터 제작 & 전송.
async function makeAndSendOrderData() {
  // * 배송지 정보 데이터 제작.
  const receiverName = receiverNameInput.value;
  const receiverPhoneNumber = receiverPhoneNumberInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const request = requestSelectBox.value;

  const data = {
    receiverName,
    receiverPhoneNumber,
    postalCode,
    address1,
    address2,
    request
  }
  
  // ㅇㅇㅇ 변수로 채워주고.
  alert('ㅇㅇㅇ 에 대한 결제를 진행합니다.')

  // * 주문 정보 데이터 제작.

  let orderProductData = [];
  orderData.forEach(item => {
    const { name, count } = item;

    orderProductData.push({ name, count });
  });

  // 배열 형태로 저장되어 있는 주문 상품 정보는 배송지 정보 객체에 한 필드를 파서 객체들을 담은 배열 형태로 만들어 서버로 넘겨줌.
  data.orderProductData = orderProductData;

  console.log(data);

  // const dataJson = JSON.stringify(data);

  // const apiUrl = `https://${window.location.hostname}:8190/api/order`

  // const res = await fetch(apiUrl, {
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/json',
  //   },
  //   body: dataJson
  // });

  // // * 주문 성공 시.
  // if(res.ok) {
  //   // * 주문 완료 데이터 삭제.
  //   if(localStorageOrderData !== null) {
  //     localStorage.removeItem('order');
  //   }
  //   else {
  //     const checkedFalseCartData = localStorageCartData.filter(item => {return item.checked == false});
  //     if(checkedFalseCartData.length == 0) {
  //       localStorage.removeItem('cart');
  //     }
  //     else {
  //       localStorage.setItem('cart', JSON.stringify(checkedFalseCartData)); 
  //     }
  //   }

  //   // * 결제 완료 페이지로 이동시키기.
  //   window.location.replace('./orderComplete.html');
  // }
  // // * 주문 실패 시.
  // else {
  //   console.log(res.status);
  //   alert('주문 실패. 다시 시도해주세요.');
  // } 

  // window.location.replace('./orderComplete.html')
};