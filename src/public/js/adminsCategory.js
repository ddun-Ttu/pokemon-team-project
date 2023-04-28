const localCategory = localStorage.getItem("categoryObj");
const categoryObj = JSON.parse(localCategory);

<<<<<<< HEAD
// 카테고리 목록 추가
=======
>>>>>>> develop
if (categoryObj) {
  const categoryHtml = categoryObj
    .map(
      (obj, index) => `
    <tr>
      <td></td>
      <td>${obj.name}</td>
      <td>${obj.ex}</td>
<<<<<<< HEAD
      <td><button id="edit" class="btn-my-orders">수정</button></td>
=======
      <td>
          <button class="btn-my-orders">수정</button>
      </td>
>>>>>>> develop
      <td><button class="btn-my-orders delete-btn" data-index="${index}">삭제</button></td>
    </tr>
  `
    )
    .join("");

  const listCategory = document.querySelector("#list-category");
  listCategory.innerHTML = categoryHtml;

<<<<<<< HEAD
  // 삭제버튼 누르면 요소 삭제
=======
>>>>>>> develop
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
 
      const index = parseInt(btn.dataset.index);
      console.log(index)

    // 해당 인덱스 삭제
      categoryObj.splice(index, 1);
      const categoryObjStr = JSON.stringify(categoryObj);
      localStorage.setItem("categoryObj", categoryObjStr);

      btn.closest("tr").remove();
    });
  });
}
<<<<<<< HEAD

// 수정버튼 누르면 수정되기 ((실패.....다음에 도전))

// const editBtn = document.querySelector("#edit");

// editBtn.addEventListener("click" , function(event) {
//   event.preventDefault();

//   let dataEdit = JSON.parse(localStorage.getItem(categoryObj));
//   console.log(dataEdit)

// })
=======
>>>>>>> develop
