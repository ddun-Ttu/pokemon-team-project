const localCategory = localStorage.getItem("categoryObj");
const categoryObj = JSON.parse(localCategory);


if (categoryObj) {
  const categoryHtml = categoryObj.map((obj, index) => `
    <tr>
      <td></td>
      <td>${obj.name}</td>
      <td>${obj.ex}</td>
      <td><a href="/admins/pokemons/{pokemonId}/edit"><button class="btn-my-orders">수정</button></a></td>
      <td><button class="btn-my-orders delete-btn" data-index="${index}">삭제</button></td>
    </tr>
  `).join("");

  const listCategory = document.querySelector("#list-category");
  listCategory.innerHTML = categoryHtml;


  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.preventDefault();

      const index = parseInt(btn.dataset.index);

      categoryObj.splice(index, 1);
      const categoryObjStr = JSON.stringify(categoryObj);
      localStorage.setItem("categoryObj", categoryObjStr);

      btn.closest("tr").remove();
    });
  });
}