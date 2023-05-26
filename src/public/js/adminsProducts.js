const tbody = document.getElementsByTagName('tbody')[0];
const API_URL = config.apiHost;

let products = [];

/** 화면 초기화 */
async function init() {
  await getProducts();

  // 표 그린 후 삭제버튼 추가
  drawTable();
  deleteBtns = document.querySelectorAll('.delete-btn');
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', deleteProduct);
  }
}

/** 상품 목록 불러오기 */
async function getProducts() {
  const response = await fetch(API_URL + '/api/products', {
    method: 'GET',
  });
  const json = await response.json();
  products = [...json];
}

/** 상품 표 그리기 */
function drawTable() {
  if (!products.length) return;

  products.forEach(product => {
    const row = document.createElement('tr');
    const template = `
      <td>${product.createdAt.substr(0, 10)}</td>
      <td>${product.updatedAt.substr(0, 10)}</td>
      <td>${product.name}</td>
      <td><!--카테고리 이름--></td>
      <td>${product.price}</td>
      <td>${product.stock}</td>
      <td>
        <a href="/admins/products/${product._id}/edit">
          <button class="btn-my-orders">수정</button>
        </a>
      </td>
      <td>
        <button
          class="btn-my-orders delete-btn"
          data-id="${product._id}"
        >
          삭제
        </button>
      </td>
    `;

    row.innerHTML = template;
    tbody.appendChild(row);
  });
}

/** 상품 삭제 */
async function deleteProduct(e) {
  const btn = e.target;
  const productId = btn.dataset.id;

  // [DELETE] /api/products -> 상품 삭제 요청
  const response = await fetch(API_URL + '/api/products/' + productId, {
    method: 'DELETE',
  });
  const json = await response.json();

  window.location.reload();
}

init();
