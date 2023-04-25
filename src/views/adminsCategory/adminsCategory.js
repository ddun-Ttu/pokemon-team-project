const localCategory = localStorage.getItem("categoryObj");
const categoryObj = JSON.parse(localCategory);

// Add category list
if (categoryObj) {
  const categoryHtml = categoryObj.map((obj, index) => `
    <tr>
      <td></td>
      <td>${obj.name}</td>
      <td>${obj.ex}</td>
      <td><button class="btn-my-orders">수정</button></td>
      <td><button class="btn-my-orders delete-btn" data-index="${index}">삭제</button></td>
    </tr>
  `).join("");

  const listCategory = document.querySelector("#list-category");
  listCategory.innerHTML = categoryHtml;

  // Delete the element when the delete button is pressed
  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();

      // Get the index of the clicked button's parent element
      const index = parseInt(btn.dataset.index);

      // Delete the element at that index from localStorage
      categoryObj.splice(index, 1);
      const categoryObjStr = JSON.stringify(categoryObj);
      localStorage.setItem("categoryObj", categoryObjStr);

      // Remove the element from the screen
      btn.closest("tr").remove();
    });
  });
}