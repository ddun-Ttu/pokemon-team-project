const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

const API_URL = config.apiHost;

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

// 주문 목록 조회
function paintTable(orderList) {
  console.log(orderList);

  //테이블 생성 및 데이터 출력
  for (let i = 0; i < orderList.length; i++) {
    const row = `<tr>
    <td>${orderList[i].createdAt.split('T')[0]}</td>
    <td>${orderList[i].productData[0].productId} / ${
      orderList[i].productData[0].quantity
    } 마리(개)</td>
    <td>${orderList[i].orderState}</td>
    <td><a href="/users/mypage/orders/${
      orderList[i]._id
    }/edit"><button id="btn-order-edit">주문 수정</button></td>
    <td><button id="btn-order-cancel" class="${
      orderList[i]._id
    }">주문 취소</button></td>
    </tr>`;

    const tbody = document.querySelector('tbody');
    tbody.innerHTML += row;
  }

  // 주문 취소 이벤트
  for (let i = 0; i < orderList.length; i++) {
    console.log(orderList[i]._id);

    cancelBtns = document.getElementsByClassName(`${orderList[i]._id}`);
    Array.from(cancelBtns).forEach(btn => {
      btn.addEventListener('click', async e => {
        e.preventDefault();

        await fetch(API_URL + `/api/orders/${orderList[i]._id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderState: '주문취소',
          }),
        })
          .then(res => res.json())
          .then(data => {
            resultData = data;
          });

        console.log(resultData);
        const result = resultData.ok;
        console.log(result);
        if (!result || result === undefined) {
          console.log('cancel-req fail');
          alert(
            '주문 취소에 실패했습니다. 반복적으로 동일 현상이 발생할 경우 고객센터에 문의바랍니다.',
          );
        } else {
          console.log('cancel-req success');
          alert('주문이 취소되었습니다.');
          window.location.replace('/users/mypage/orders');
        }
      });
    });
  }
}
