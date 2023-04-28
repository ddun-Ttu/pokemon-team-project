// api delete
async function deleteItem(index) {
  const item = data[index];
  const response = await fetch(common.API_URL + "/api/categories/" + item._id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const result = await response.json();
  console.log(result);
}
햐;
// db에서 주문정보 삭제
async function deleteOrderData(event) {
  event.preventDefault();

  try {
    await Api.delete("/api/categories/", orderIdToDelete);

    // 삭제 성공
    alert("주문 정보가 삭제되었습니다.");

    // 삭제한 아이템 화면에서 지우기
    const deletedItem = document.querySelector(`#order-${orderIdToDelete}`);
    deletedItem.remove();

    // 전역변수 초기화
    orderIdToDelete = "";

    closeModal();
  } catch (err) {
    alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
  }
}

const localCategory = localStorage.getItem("categoryObj");
// const categoryObj = JSON.parse(localCategory);

// 카테고리 목록 추가
let orderIdToDelete;
async function insertOrders() {
  const orders = await Api.get("/api/orderlist/user");

  for (const order of orders) {
    const { _id, createdAt, summaryTitle, status } = order;
    const date = createdAt.split("T")[0];

    ordersContainer.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
      <td></td>
      <td>${obj.categoryName}</td>
      <td><a href="/api/categories/${obj._id}"><button id="edit" class="btn-my-orders">수정</button></a></td>
      <td><button class="btn-my-orders delete-btn" data-index="${index}">삭제</button></td>
    </tr>

      `
    );
    const listProduct = document.querySelector("#list-orders");
    listProduct.innerHTML = adminsProductHtml;

    // 클릭하면 해당 인덱스 값을 찾아서 삭제
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const index = parseInt(btn.dataset.index);
        deleteItem(index);
        data.splice(index, 1);
        insertOrders();
        console.log(index);
      });
    });
  }
}
let data = [];

//api get
async function getData() {
  const response = await fetch(common.API_URL + "/api/categories", {
    method: "GET",
  });
  data = await response.json();
  insertOrders();
  // console.log(data);
}

getData();

// 클릭하면 해당 포켓몬의 ID값을 추출하여 페이지 이동
const editBtns = document.querySelectorAll(".btn-my-orders");
editBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const categoryId = btn.getAttribute("href").split("/")[3];
    window.location.href = "/admins/categories/" + categoryId + "/edit";
    console.log(categoryId);
  });
});
