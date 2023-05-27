const receiverInputElm = document.querySelector('#receiver');
const phoneNumberInputElm = document.querySelector('#phone-number');
const postalCodeInputElm = document.querySelector('#postalCode');
const address1InputElm = document.querySelector('#address1');
const address2InputElm = document.querySelector('#address2');

const token = localStorage.getItem('token');
const API_URL = config.apiHost;

let urlArr = window.location.href.split('/');
urlArr.pop();
const orderId = urlArr.pop();

// 기존 정보 불러오기
window.onload = async function (e) {
  e.preventDefault();

  await fetch(API_URL + `/api/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      orderData = data;
    });

  const receiver = orderData.receiver;
  const phoneNumber = orderData.phoneNumber;
  const postalcode = orderData.postalCode;
  const address1 = orderData.address1;
  const address2 = orderData.address2;

  receiverInputElm.placeholder = receiver;
  phoneNumberInputElm.placeholder = phoneNumber;
  postalCodeInputElm.placeholder = postalcode;
  address1InputElm.placeholder = address1;
  address2InputElm.placeholder = address2;
};

const searchAddressButton = document.querySelector('#searchAddressButton');
const saveButton = document.querySelector('#saveButton');

searchAddressButton.addEventListener('click', searchAddress);
saveButton.addEventListener('click', modifyDeliveryInfo);

// 주소 찾기
function searchAddress(e) {
  e.preventDefault();
  new daum.Postcode({
    oncomplete: function (data) {
      console.log(data);
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

      postalCodeInputElm.value = data.zonecode;
      address1InputElm.value = `${addr} ${extraAddr}`;
      address2InputElm.placeholder = '상세 주소를 입력해 주세요.';
      address2InputElm.focus();
    },
  }).open();
}

// 배송지 정보 수정
async function modifyDeliveryInfo(e) {
  e.preventDefault();

  let updatedData = {};

  if (receiverInputElm.value) {
    updatedData['receiver'] = receiverInputElm.value;
  } else if (phoneNumberInputElm.value) {
    updatedData['phoneNumber'] = phoneNumberInputElm.value;
  } else if (postalCodeInputElm.value) {
    updatedData['postalCode'] = postalCodeInputElm.value;
  } else if (address1InputElm.value) {
    updatedData['address1'] = address1InputElm.value;
  } else if (address2InputElm.value) {
    updatedData['address2'] = address2InputElm.value;
  } else if (updatedData === {}) {
    alert('수정된 항목이 없습니다.');
    window.location.replace(`/users/mypage/${orderId}/edit`);
  }

  // post 요청
  await fetch(API_URL + `/api/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then(res => res.json())
    .then(data => {
      resultData = data;
    });

  const result = resultData.ok;

  if (!result || result === false) {
    alert('배송지 정보 수정에 실패하였습니다. 다시 양식을 제출해주세요.');
    window.location.replace(`/users/mypage/orders/${orderId}/edit`);
  } else {
    alert('배송지 정보가 수정되었습니다.');
    window.location.replace(`/users/mypage/orders/${orderId}/edit`);
  }
}
