const TOKEN = localStorage.getItem('token');

window.onload = async function (e) {
  e.preventDefault();

  await fetch(API_URL + `/api/orders`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      orderData = data;
      console.log(orderData);
    });

  paintOrderListTable(orderData);
};

const paintOrderListTable = orderData => {
  for (let i = 0; i < orderData.length; i++) {
    const row = `
    <tr data-order-id = "${orderData[i]._id}" >
      <td>${orderData[i].createdAt.split('T')[0]}</td>
      <td>${orderData[i].productData[0].productId} / ${
      orderData[i].productData[0].quantity
    } 마리(개)</td>
      <td>${orderData[i].productData[0].totalPrice}</td>
      <td>
        <select id="status" name="orderState" onchange="saveOrderState(this)">
          <option value="" selected disabled>${orderData[i].orderState}</option>
          <option value="입금대기중">입금대기중</option>
          <option value="결제완료">결제완료</option>
          <option value="상품준비중">상품준비중</option>
          <option value="배송중">배송중</option>
          <option value="배송완료">배송완료</option>
          <option value="구매확정">구매확정</option>
          <option value="주문취소">주문취소</option>
        </select>
      </td>
      <td><button onclick="deleteOrder(this)">삭제</button></td>
    </tr>
    `;

    console.log(orderData[i]._id);
    const orderList = document.getElementById('orderList');
    orderList.innerHTML += row;
  }
};

const saveOrderState = async selectElement => {
  const updatedOrderState = { orderState: selectElement.value };
  console.log(updatedOrderState);

  const orderId = selectElement.closest('tr').dataset.orderId;
  console.log(orderId);

  await fetch(API_URL + `/api/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedOrderState),
  })
    .then(res => res.json())
    .then(data => {
      resultData = data;
      console.log(resultData);
    });

  if (!resultData || resultData[0] === false) {
    alert('주문 상태 수정에 실패하였습니다.');
    window.location.replace('/admins/orders');
  } else {
    alert('주문 상태 수정이 완료되었습니다.');
    window.location.replace('/admins/orders');
  }
};

const deleteOrder = async buttonElement => {
  const orderId = buttonElement.closest('tr').dataset.orderId;
  console.log(orderId);

  await fetch(API_URL + `/api/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      resultData = data;
      console.log(resultData);
    });

  if (!resultData || resultData[0] === false) {
    alert('주문 삭제에 실패하였습니다.');
    // window.location.replace('/admins/orders');
  } else {
    alert('주문이 삭제되었습니다.');
    // window.location.replace('/admins/orders');
  }
};

// //임의로 덤미 만들기
// const dummyData = [
//   {
//     date: '2023.04.26',
//     orderName: '피카츄',
//     count: 2,
//     item: '상품준비중',
//     totalPrice: 2000,
//   },
//   {
//     date: '2023.04.22',
//     orderName: '파이리',
//     count: 1,
//     item: '배송완료',
//     totalPrice: 2000,
//   },
//   {
//     date: '2023.04.21',
//     orderName: '캐터피',
//     count: 1,
//     item: '상품배송중',
//     totalPrice: 2000,
//   },
//   {
//     date: '2023.04.19',
//     orderName: '병아리',
//     count: 1,
//     item: '배송완료',
//     totalPrice: 4000,
//   },
//   {
//     date: '2023.04.26',
//     orderName: '파이리',
//     count: 2,
//     item: '상품준비중',
//     totalPrice: 2000,
//   },
// // ];

// const orderCount = document.querySelector('#order-count');
// const prepareCount = document.querySelector('#prepare-count');
// const deliveryCount = document.querySelector('#delivery-count');
// const completeCount = document.querySelector('#complete-count');

// // 더미 데이터 로컬에 저장하기
// // localStorage.setItem('orderDummy', JSON.stringify(dummyData));
// // const dummyStr = localStorage.getItem('orderDummy');
// // const updatedDummyObjStr = JSON.parse(dummyStr);
// // console.log(updatedDummyObjStr);

// // html에 뿌리기
// if (updatedDummyObjStr) {
//   const orderHtml = updatedDummyObjStr
//     .map((obj, index) => {
//       let itemValue = '';
//       if (obj.item === '상품준비중') {
//         itemValue = '상품준비중';
//       } else if (obj.item === '상품배송중') {
//         itemValue = '상품배송중';
//       } else if (obj.item === '배송완료') {
//         itemValue = '배송완료';
//       }

//       return `
//     <tr>
//     <td>${obj.date}</td>
//     <td>${obj.orderName} / ${obj.count}마리</td>
//     <td>${obj.totalPrice}</td>
//     <td>
//     <select id="items" class="items-management-orders" name="items">
//     <option class="item2-option" value="${itemValue}">${itemValue}</option>

//   </select>
//     </td>
//     <td><button class="btn-my-orders delete-btn" data-index="${index}">주문 취소</button></td>
//     </tr>
//     `;
//     })
//     .join('');

//   const listOrder = document.querySelector('#list-orders');
//   listOrder.innerHTML = orderHtml;

//   const count = updatedDummyObjStr.map(obj => {
//     const total = {
//       prepareCount: 0,
//       deliveryCount: 0,
//       completeCount: 0,
//     };

//     // 상태관리 수 체크
//     if (obj.item === '상품준비중') {
//       total.prepareCount += 1;
//       console.log(total.prepareCount);
//       prepareCount.innerHTML = total.prepareCount;
//     } else if (obj.item === '상품배송중') {
//       total.deliveryCount += 1;
//       deliveryCount.innerHTML = total.deliveryCount;
//     } else if (obj.item === '배송완료') {
//       total.completeCount += 1;
//       completeCount.innerHTML = total.completeCount;
//     }
//   });
// }

// const dummyLength = updatedDummyObjStr.length;

// // 총주문 수 체크
// if (dummyLength > 0) {
//   orderCount.innerHTML = dummyLength;
// }

// // 삭제
// const deleteBtns = document.querySelectorAll('.delete-btn');
// deleteBtns.forEach(btn => {
//   btn.addEventListener('click', function (e) {
//     e.preventDefault();

//     const index = parseInt(btn.dataset.index);
//     console.log(index);

//     // 해당 인덱스 삭제
//     dummyData.splice(index, 1);
//     const dummyObjStr = JSON.stringify(dummyData);
//     localStorage.setItem('orderDummy', dummyObjStr);

//     btn.closest('tr').remove();
//   });
// });

// // 셀렉터 로컬에 저장하기
// const itemSelect = document.querySelector('#items');

// itemSelect.addEventListener('change', function () {
//   const selectValue = itemSelect.value;
//   console.log(selectValue);
//   localStorage.setItem('selectItem', selectValue);
// });
