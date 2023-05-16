const tbody = document.getElementsByTagName('tbody')[0];

const API_URL = config.apiHost;
let categories = [];

/** 화면 초기화 */
async function init() {
  await getCategories();
  drawTable();
}

/** 카테고리 목록 불러오기 */
async function getCategories() {
  // [GET] /api/categories -> 카테고리 조회 요청
  const response = await fetch(API_URL + '/api/categories', {
    method: 'GET',
  });
  json = await response.json();
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
          <a href="${window.location.href}${category._id}/edit">
            <button id="edit" class="btn-my-orders">수정</button>
          </a>
        </td>
        <td>
          <button class="btn-my-orders delete-btn" data-index="${index}">삭제</button>
        </td>
      `;

    row.innerHTML = template;
    tbody.appendChild(row);
  });
}

init();
