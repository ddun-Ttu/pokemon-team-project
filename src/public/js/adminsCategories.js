const tbody = document.getElementsByTagName('tbody')[0];
const API_URL = config.apiHost;

let categories = [];
let deleteBtns;

/** 화면 초기화 */
async function init() {
  await getCategories();

  // 표 그린 후 삭제버튼 추가
  drawTable();
  deleteBtns = document.querySelectorAll('.delete-btn');
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', deleteCategory);
  }
}

/** 카테고리 목록 불러오기 */
async function getCategories() {
  // [GET] /api/categories -> 카테고리 조회 요청
  const response = await fetch(API_URL + '/api/categories', {
    method: 'GET',
  });
  const json = await response.json();
  console.log({
    ok: response.ok,
    statusCodes: response.status,
    length: json.length,
  });
  categories = [...json];
}

/** 카테고리 표 그리기 */
function drawTable() {
  if (!categories.length) return;

  categories.forEach((category, index) => {
    const row = document.createElement('tr');
    const template = `
    <td>
    ${category.name}
    </td>
    <td>
    ${category.description}
    </td>
    <td>
    <a href="${window.location.href + category._id}/edit">
    <button id="edit" class="btn-my-orders">수정</button>
    </a>
    </td>
    <td>
      <button
        class="btn-my-orders delete-btn"
        data-id="${category._id}"
      >
        삭제
      </button>
    </td>
    `;

    row.innerHTML = template;
    tbody.appendChild(row);
  });
}

/** 카테고리 삭제 */
async function deleteCategory(e) {
  const btn = e.target;
  const categoryId = btn.dataset.id;

  // [DELETE] /api/categories -> 카테고리 삭제 요청
  const response = await fetch(API_URL + '/api/categories/' + categoryId, {
    method: 'DELETE',
  });
  const json = await response.json();
  console.log(json);

  window.location.reload();
}

init();
