const inCart = document.querySelector('.inCart-productList-ul');
const paymentInformation = document.querySelector('.paymentInformation');
const inCartAndpaymentInformationArea = document.querySelector('.inCartAndpaymentInformation');

// * 더미 데이터.
const dummyData = [
  { id: 1,
  name: '이상해씨',
  type: '풀',
  price: 5000,
  count: 1,
  checked: true },

  { id: 2,
  name: '피카츄',
  type: '전기',
  price: 10000,
  count: 1, 
  checked: true},

  { id: 3,
    name: '꼬부기',
    type: '물',
    price: 3000,
    count: 1, 
    checked: true},

  { id: 4,
    name: '메타몽',
    type: '개구쟁이',
    price: 10000,
    count: 1, 
    checked: true},
];

// * 더미 데이터 삽입 버튼
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');

button1.addEventListener('click', () => {
  let localStorageData = JSON.parse(localStorage.getItem('cart'));

  if(localStorageData == null) {
    localStorageData = [];

    localStorageData.push(dummyData[0]);
    
    localStorage.setItem('cart', JSON.stringify(localStorageData));
  }
  else {
    const index = 
      localStorageData.findIndex(({ id }) => id == dummyData[0].id);
      
    if(index == -1) {
      localStorageData.push(dummyData[0])
    }
    else {
      localStorageData[index].count += 1;
    }
  }
})

button2.addEventListener('click', () => {
  let localStorageData = JSON.parse(localStorage.getItem('cart'));

  if(localStorageData == null) {
    localStorageData = dummyData;
    
    localStorage.setItem('cart', JSON.stringify(localStorageData));    
  }
})

printInCartAndPaymentInformation()

function printInCartAndPaymentInformation() {
  let localStorageData = JSON.parse(localStorage.getItem('cart'));

  if(localStorageData == null) {
    inCartAndpaymentInformationArea.innerHTML = '장바구니가 비었습니다.'
    return
  }
  else{
    let resultInCartHTML = '';

    makeInCartHTML();

    inCart.innerHTML = resultInCartHTML;

    let resultPaymentInformationHTML = '';
    
    let totalProductCount = 0;
    let totalProductPrice = 0;
    let deliveryFee = 3000;
    let totalPrice = 0;

    makePaymentInformationHTML();
    
    paymentInformation.innerHTML = resultPaymentInformationHTML;

    // * inCartHTML 차례대로 배열에 넣기(루프 이용).
    function makeInCartHTML() {
      // 현재 로컬스토리지에 데이터가 세팅되어 있는 상황.
      // 그 데이터 각각과 HTML 템플릿을 합성한 결과물을 배열 안에 모아주면 된다.
      // 출력 횟수를 줄이는 게 좋으니까 변수에 할당하고 마지막에 innerHTML로 조작.

      localStorageData.forEach((item, index) => {
        let { name, count, id, price, checked } = item;

        if(checked == true) {
          checked = 'checked';
        }
        else {
          checked = '';
        }
        
        resultInCartHTML += 
          `
          <li class="inCart-productList-li">
            <div class="container-productList-checkbox">
              <input class="productList-checkbox" type="checkbox" ${checked}>
            </div>
            <div class="container-productList-productIamge">
              <img class="productList-productIamge" src="../img/${name}.png" alt="">
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
                  ${count}
                </div>
                <div>
                  <button class="plusButton">+</button>
                </div>
              </div>
            </div>
            <div class="container-productList-productPrice">
              <div>${price}</div>
            </div>
            <div class="container-productList-multiplication">
              <div class="productList-multiple">X</div>
            </div>
            <div class="container-productList-productCount">
              <div>${count}</div>
            </div>
            <div class="container-productList-equal">
              <div class="productList-equal">=</div>
            </div>
            <div class="container-productList-productTotalPrice">
              <div>${price * count}</div>
            </div>
            <div class="container-productList-deleteButton">
              <button class="productList-deleteButton" id="${index}">삭제</button>
            </div>
          </li>
          `
      })
    };

    function makePaymentInformationHTML() {
      localStorageData.forEach(item => {
        let { price, count, checked } = item;
        
        if(checked == true) {
        totalProductCount += count;
        totalProductPrice += price;
        totalPrice += count * price;
        }

        resultPaymentInformationHTML = 
          `
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
            <div class="paymentInformation-totalPrice1">총 결제 금액</div>
            <div class="paymentInformation-totalPrice2">${totalPrice}원</div>
          </div>     
          <div class="container-paymentInformation-paymentButton">
            <button class="paymentInformation-paymentButton">구매하기</button>
          </div>
          `;
      })
    };
  }

  const minusButton = document.querySelectorAll('.minusButton');
  const plusButton = document.querySelectorAll('.plusButton');
  
  localStorageData.forEach((item, index) => {
    minusButton[index].addEventListener('click', () => {
      if(item.count == 1) {
        alert('수량 설정은 1 이상만 가능합니다.')
      }
      else{
        item.count--;        
      }
      localStorage.setItem('cart', JSON.stringify(localStorageData));
      printInCartAndPaymentInformation()
    })

    plusButton[index].addEventListener('click', () => {
      item.count++;
      localStorage.setItem('cart', JSON.stringify(localStorageData));
      printInCartAndPaymentInformation()
    })
  })

  const checkbox = document.querySelectorAll('.productList-checkbox');
  const superCheckbox = document.querySelector('.head-selectAllAndcancleAllCheckbox');
  
  let trueCheckboxCount = 0;

  localStorageData.forEach((item, index) => {
    const eachCheckbox = checkbox[index];

    if(eachCheckbox.checked == true) {
      trueCheckboxCount++
      if(trueCheckboxCount == localStorageData.length) {
        superCheckbox.checked = true;
      }
      else {
        superCheckbox.checked = false;
      }
    }
    
    eachCheckbox.addEventListener('click', () => {
      if(eachCheckbox.checked == false) {
        item.checked = false;

        localStorage.setItem('cart', JSON.stringify(localStorageData));
        printInCartAndPaymentInformation()
      }
      else if(eachCheckbox.checked == true) {
        item.checked = true;

        localStorage.setItem('cart', JSON.stringify(localStorageData));
        printInCartAndPaymentInformation()
      }
    })
  })

  superCheckbox.addEventListener('click', superCheckboxHandler);
  
  function superCheckboxHandler() {
    if(superCheckbox.checked == false) {
      superCheckbox.checked = false;

      localStorageData.forEach((item, index) => {
        item.checked = false;
        checkbox[index].checked = false;
      })
    }
    else if(superCheckbox.checked == true) {
      superCheckbox.checked = true;

      localStorageData.forEach((item, index) => {
        item.checked = true;
        checkbox[index].checked = true;
      })
    }

    localStorage.setItem('cart', JSON.stringify(localStorageData));
    
    printInCartAndPaymentInformation()
  }

  const deleteButton = document.querySelectorAll('.productList-deleteButton');

  localStorageData.forEach((item, index) => {
    const eachDeleteButton = deleteButton[index];

    eachDeleteButton.addEventListener('click', (e) => {
      const target = e.target;

      if(localStorageData.length == 1) {
        localStorage.removeItem('cart');
      }
      else{
        localStorageData.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(localStorageData))
      }

      printInCartAndPaymentInformation()
    })
  });

  const deleteAllButton = document.querySelector('.head-deleteAllButton');

  deleteAllButton.addEventListener('click', () => {
    localStorage.removeItem('cart')

    printInCartAndPaymentInformation()
  });

  const goOrderButton = document.querySelector('.paymentInformation-paymentButton');

  goOrderButton.addEventListener('click', goOrderButtonHandler);

  async function goOrderButtonHandler() {
  // 주문 페이지로 보내기 전에 먼저 작업해줄 게 있을까?
  
    window.location.href="./orderAndPayment.html";
  }
};