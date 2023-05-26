makePaymentInformation();
addEventListenerToSearchAddressButton();
addEventListenerToOrderButton();
deleteLocalStorageOrderDataWhenEscapeThisPage();

function makePaymentInformation() {
  const fromPage = identifyFromPage();

  makeDataForPaymentInformation(fromPage);

  // 상세 페이지에서 넘어왔는지 장바구니에서 넘어왔는지 구분 작업.
  // - 상세 페이지 출신이면 로컬 스토리지에 'order' 데이터가 존재할 것.
  // - 'order'가 없으면 장바구니에서 넘어온 'cart' 데이터가 존재할 것.
  function identifyFromPage() {
    const localStorageOrderData = JSON.parse(localStorage.getItem('order'));

    if (localStorageOrderData !== null) {
      return 'order';
    }

    return 'cart';
  }

  function makeDataForPaymentInformation(fromPage) {
    const data = JSON.parse(localStorage.getItem(fromPage));

    let productListHTML = '';
    let totalProuctPrice = 0;
    let totalDeliveryFee = 0;
    let finalPrice;

    data.forEach((item, index) => {
      const { _id, name, quantity, price } = item;

      productListHTML += `
        <li data-_id="${_id}" data-quantity="${quantity}">
            <div>${name} / ${quantity}개</div>
        </li>
        `;

      totalProuctPrice += quantity * price;
      totalDeliveryFee += quantity * 5000;

      if (index === data.length - 1) {
        finalPrice = totalProuctPrice + totalDeliveryFee;
      }
    });

    insertDataToPaymentInformation(
      productListHTML,
      totalProuctPrice,
      totalDeliveryFee,
      finalPrice,
    );
  }

  function insertDataToPaymentInformation(
    productListHTML,
    totalProuctPrice,
    totalDeliveryFee,
    finalPrice,
  ) {
    const productNameAndProductCountArea = document.querySelector(
      '.paymentInformation-NameAndCountList-list-ul',
    );
    const productTotalPriceArea = document.querySelector(
      '.paymentInformation-productTotalPrice',
    );
    const deliveryFeeArea = document.querySelector(
      '.paymentInformation-deliveryFee-deliveryFee',
    );
    const finalPriceArea = document.querySelector(
      '.paymentInformation-finalPrice',
    );

    productNameAndProductCountArea.insertAdjacentHTML(
      'beforeend',
      productListHTML,
    );
    productTotalPriceArea.textContent = `${totalProuctPrice.toLocaleString()}원`;
    deliveryFeeArea.textContent = `${totalDeliveryFee.toLocaleString()}원`;
    finalPriceArea.textContent = `${finalPrice.toLocaleString()}원`;
  }
}

function addEventListenerToSearchAddressButton() {
  const searchAddressButton = document.querySelector('#searchAddressButton');

  searchAddressButton.addEventListener('click', searchAddress);

  function searchAddress(e) {
    e.preventDefault();

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
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        document.getElementById('postalCode').value = data.zonecode;
        console.log(extraAddr);
        document.getElementById('address1').value = `${addr} ${extraAddr}`;
        // 커서를 상세주소 필드로 이동한다.
        document.getElementById('address2').focus();
      },
    }).open();
  }
}

function addEventListenerToOrderButton() {
  const receiverNameInput = document.querySelector('#receiverName');
  const receiverPhoneNumberInput = document.querySelector(
    '#receiverPhoneNumber',
  );
  const postalCodeInput = document.querySelector('#postalCode');
  const address1Input = document.querySelector('#address1');
  const address2Input = document.querySelector('#address2');
  const requestSelectBox = document.querySelector('#requestSelectBox');

  const orderButton = document.querySelector('#orderButton');

  orderButton.addEventListener('click', () => {
    checkDeliveryData()
      // checkDeliveryData()를 통과하지 못했을 경우 코드 실행 중단 & catch에서 alert 메세지 출력.
      // checkDeliveryData()를 통과하면 서버 데이터 보낼 준비 시작.
      .then(() => makeOrderData())
      .then(res => sendOrderDataToServer(res))
      .catch(error => alert(error));
  });

  async function checkDeliveryData(deliveryData) {
    const receiver = receiverNameInput.value;
    const phoneNumber = receiverPhoneNumberInput.value;
    const postalCode = postalCodeInput.value;
    const address2 = address2Input.value;

    if (!receiver || !phoneNumber || !postalCode || !address2) {
      throw '배송지 정보를 모두 입력해주세요';
    }
    return;
  }

  function makeOrderData() {
    const deliveryData = makeDeliveryData();
    const orderProductData = makeOrderProductData();

    deliveryData.orderProductData = orderProductData;

    const orderData = deliveryData;

    return orderData;
  }

  function makeDeliveryData() {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const receiver = receiverNameInput.value;
    const phoneNumber = receiverPhoneNumberInput.value;
    const postalCode = postalCodeInput.value;
    const address1 = address1Input.value;
    const address2 = address2Input.value;
    const request = requestSelectBox.value;

    const deliveryData = {
      userId,
      receiver,
      phoneNumber,
      postalCode,
      address1,
      address2,
      request,
    };

    return deliveryData;
  }

  function makeOrderProductData() {
    const element = document.querySelectorAll(
      '.paymentInformation-NameAndCountList-list-ul > li',
    );

    let orderProductData = [];

    element.forEach(item => {
      const _id = item.dataset._id;
      const quantity = Number(item.dataset.quantity);

      orderProductData.push({ _id, quantity });
    });

    return orderProductData;
  }

  async function sendOrderDataToServer(orderData) {
    const dataJson = JSON.stringify(orderData);

    const url = `${common.API_URL}/order`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: dataJson,
    });

    const localStorageOrderData = JSON.parse(localStorage.getItem('order'));
    const localStorageCartData = JSON.parse(localStorage.getItem('cart'));

    // if (res.ok) {
    if (true) {
      if (localStorageOrderData !== null) {
        localStorage.removeItem('order');
      } else {
        const checkedFalseCartData = localStorageCartData.filter(item => {
          return item.checked === false;
        });
        if (checkedFalseCartData.length === 0) {
          localStorage.removeItem('cart');
        } else {
          localStorage.setItem('cart', JSON.stringify(checkedFalseCartData));
        }
      }

      window.location.replace('/orderEnd');
    } else {
      console.log(res.status);
      alert('주문 실패. 다시 시도해주세요.');
    }
  }
}

// 페이지 이동(구매 버튼 클릭이 아닌 다른 방법으로) 시 로컬 스토리지의 order 데이터 삭제.
// - 이 데이터를 삭제하지 않으면 장바구니에서 넘어와도 오더 데이터가 잡히게 됨.
// - cart 데이터는 남김. cart 데이터는 주문 버튼 클릭으로 주문 완료 시에만 주문한(check=true) 목록 삭제.
function deleteLocalStorageOrderDataWhenEscapeThisPage() {
  window.addEventListener('unload', () => {
    localStorage.removeItem('order');
  });
}
