// api delete
async function deleteItem(index) {
  const item = data[index];
  const response = await fetch(common.API_URL + "/api/pokemons/" + item._id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
  const result = await response.json();
  console.log(result);
}

// 데이터 추가
function updateUI() {
  let adminsProductHtml = "";
  if (data) {
    adminsProductHtml = data
      .map((obj, index) => {
        //날짜 필요한 부분 추출
        const createdAtDate = new Date(obj.createdAt);
        const formattedDate = createdAtDate.toISOString().substr(0, 10);
        return `
          <tr>
            <td>${formattedDate}</td>
            <td>${obj.detailInfo}</td>
            <td>${obj.pokemonName}</td>
            <td>${obj.pokemonType}</td>
            <td>${obj.price}</td>
            <td><button class="btn-my-orders">수정</button></td>
            <td><button class="btn-my-orders delete-btn" data-index="${index}">삭제</button></td>
          </tr>
        `;
      })
      .join("");
  }
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
      updateUI();
    });
  });
}

let data = [];

//api get
async function getData() {
  const response = await fetch(common.API_URL + "/api/pokemons", {
    method: "GET",
  });
  data = await response.json();
  updateUI();
  console.log(data);
}

getData();
