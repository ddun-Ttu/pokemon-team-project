const categoriesName = document.querySelector('#categories-name');
const categoriesDesc = document.querySelector('#categories-desc');
const button = document.querySelector('#categories-but');

const API_URL = config.apiHost;

async function handleClick(e) {
  e.preventDefault();

  const category = {
    name: categoriesName.value,
    description: categoriesDesc.value,
  };
  const data = JSON.stringify(category);

  // [POST] /api/categories -> 새 카테고리 생성 요청
  const responseData = await fetch(API_URL + '/api/categories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })
    .then(response => response.json())
    .then(data => data);
  console.log(responseData);
}

button.addEventListener('click', handleClick);
