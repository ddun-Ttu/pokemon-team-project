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
  console.log(item._id);
  // const result = await response.json();
}

const localCategory = localStorage.getItem("categoryObj");
// const categoryObj = JSON.parse(localCategory);

// 카테고리 목록 추가
function updataUI() {
  if (data) {
    const categoryHtml = data
      .map(
        (obj, index) => `
      <tr>
        <td></td>
        <td>${obj.categoryName}</td>
        <td><a href="/api/categories/${obj._id}"><button id="edit" class="btn-my-orders">수정</button></a></td>
        <td><button class="btn-my-orders delete-btn" data-index="${index}">삭제</button></td>
      </tr>
    `
      )
      .join("");

    const listCategory = document.querySelector("#list-category");
    listCategory.innerHTML = categoryHtml;

    // 삭제버튼 누르면 요소 삭제
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const index = parseInt(btn.dataset.index);
        deleteItem(index);
        data.splice(index, 1);
        updataUI();
      });
    });
  }
}
let data = [];

//api get
async function getData() {
  const response = await fetch(common.API_URL + "/api/categories/", {
    method: "GET",
  });
  data = await response.json();
  updataUI();
  console.log(response);
  // console.log("성공!!");
}

getData();

// 클릭하면 해당 포켓몬의 ID값을 추출하여 페이지 이동
const editBtns = document.querySelectorAll(".btn-my-orders");
editBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const categoryId = btn.getAttribute("href").split("/")[3];
    window.location.href = "/api/categories/" + categoryId + "/edit";
  });
});
