const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

//페이지 로드 시 사용자 주문 내역 불러오기
window.onload = async function (e) {
  e.preventDefault();

  await fetch(API_URL + `/api/users/${userId}/orders`, {
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

  const orderList = orderData;
  paintTable(orderList);
};

// 테이블 생성 + 데이터 출력
function paintTable(orderList) {
  console.log(orderList);

  const table = document.querySelector('#table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  for (let i = 0; i < orderList.length; i++) {
    // const createdAt = orderList[i].createdAt;
    // const date = createdAt.split('T');
    const row = `
   <tr>
    <td>${orderList[i].createdAt.split('T')[0]}</td>
    <td>${orderList[i].productData[0].productId} / ${
      orderList[i].productData[0].quantity
    } 마리(개)</td>
    <td>${orderList[i].orderState}</td>
    <td>주문 수정</td>
    <td>주문 취소</td>
   </tr>`;
    tbody.innerHTML += row;
  }
}
