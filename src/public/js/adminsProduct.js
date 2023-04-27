const localproduct = localStorage.getItem("registratObj");
const productObj = JSON.parse(localproduct);

if (productObj) {
  const productHtml = productObj
    .map(
      (obj, index) => `
    <tr>
      <td>${obj.productName}</td>
      <td>${obj.items}</td>
      <td>${obj.summary}</td>
      <td>${obj.price}</td>
      <td><button class="btn-my-orders">수정</button></td>
      <td><button class="btn-my-orders delete-btn" data-index="${index}">삭제</button></td>
    </tr>
  `
    )
    .join("");

  const listProduct = document.querySelector("#list-product");
  listProduct.innerHTML = productHtml;

  const deleteBtns = document.querySelectorAll(".delete-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      const index = parseInt(btn.dataset.index);

      productObj.splice(index, 1);
      const categoryObjStr = JSON.stringify(productObj);
      localStorage.setItem("registratObj", categoryObjStr);

      btn.closest("tr").remove();
    });
  });
}

// 등록된 상품 수
const productCountLength = productObj.length;
const productCount = document.querySelector("#product-count");

productCount.innerHTML = productCountLength;
