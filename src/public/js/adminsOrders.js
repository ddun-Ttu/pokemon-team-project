// //임의로 덤미 만들기
// const dummyData = [
//   {
//     date: "2023.04.26",
//     orderName: "피카츄",
//     count: 2,
//     item: "상품준비중",
//     totalPrice: 2000,
//   },
//   {
//     date: "2023.04.22",
//     orderName: "파이리",
//     count: 1,
//     item: "배송완료",
//     totalPrice: 2000,
//   },
//   {
//     date: "2023.04.21",
//     orderName: "캐터피",
//     count: 1,
//     item: "상품배송중",
//     totalPrice: 2000,
//   },
//   {
//     date: "2023.04.19",
//     orderName: "병아리",
//     count: 1,
//     item: "배송완료",
//     totalPrice: 4000,
//   },
//   {
//     date: "2023.04.26",
//     orderName: "파이리",
//     count: 2,
//     item: "상품준비중",
//     totalPrice: 2000,
//   },
// ];

const orderCount = document.querySelector("#order-count");
const prepareCount = document.querySelector("#prepare-count");
const deliveryCount = document.querySelector("#delivery-count");
const completeCount = document.querySelector("#complete-count");

// 로컬에 저장하기
localStorage.setItem("orderDummy", JSON.stringify(dummyData));
const dummyStr = localStorage.getItem("orderDummy");
const updatedDummyObjStr = JSON.parse(dummyStr);
// console.log(updatedDummyObjStr);

// html에 뿌리기
if (updatedDummyObjStr) {
  const orderHtml = updatedDummyObjStr
    .map((obj, index) => {
      let itemValue = "";
      if (obj.item === "상품준비중") {
        itemValue = "상품준비중";
      } else if (obj.item === "상품배송중") {
        itemValue = "상품배송중";
      } else if (obj.item === "배송완료") {
        itemValue = "배송완료";
      }

      return `
    <tr>
    <td>${obj.date}</td>
    <td>${obj.orderName} / ${obj.count}마리</td>
    <td>${obj.totalPrice}</td>
    <td>
    <select id="items" class="items-management-orders" name="items">
    <option class="item2-option" value="${itemValue}">${itemValue}</option>

  </select>
    </td>
    <td><button class="btn-my-orders delete-btn" data-index="${index}">주문 취소</button></td>
    </tr>
    `;
    })
    .join("");

  const listOrder = document.querySelector("#list-orders");
  listOrder.innerHTML = orderHtml;

  const count = updatedDummyObjStr.map((obj) => {
    const total = {
      prepareCount: 0,
      deliveryCount: 0,
      completeCount: 0,
    };

    // 상태관리 수 체크
    if (obj.item === "상품준비중") {
      total.prepareCount += 1;
      console.log(total.prepareCount);
      prepareCount.innerHTML = total.prepareCount;
    } else if (obj.item === "상품배송중") {
      total.deliveryCount += 1;
      deliveryCount.innerHTML = total.deliveryCount;
    } else if (obj.item === "배송완료") {
      total.completeCount += 1;
      completeCount.innerHTML = total.completeCount;
    }
  });
}

const dummyLength = updatedDummyObjStr.length;

// 총주문 수 체크
if (dummyLength > 0) {
  orderCount.innerHTML = dummyLength;
}

// 삭제
const deleteBtns = document.querySelectorAll(".delete-btn");
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const index = parseInt(btn.dataset.index);
    console.log(index);

    // 해당 인덱스 삭제
    dummyData.splice(index, 1);
    const dummyObjStr = JSON.stringify(dummyData);
    localStorage.setItem("orderDummy", dummyObjStr);

    btn.closest("tr").remove();
  });
});

// 셀렉터 로컬에 저장하기
const itemSelect = document.querySelector("#items");

itemSelect.addEventListener("change", function () {
  const selectValue = itemSelect.value;
  console.log(selectValue);
  localStorage.setItem("selectItem", selectValue);
});
