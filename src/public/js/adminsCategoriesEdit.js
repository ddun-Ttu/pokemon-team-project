const categoriesName = document.querySelector('#categories-name');
const categoriesDesc = document.querySelector('#categories-desc');
const button = document.querySelector('#categories-but');

const API_URL = config.apiHost;
const categoryId = window.location.pathname.split('/')[3];

async function handleClick(e) {
  e.preventDefault();

  const category = {};

  const name = categoriesName.value.trim();
  const description = categoriesDesc.value.trim();

  name && (category.name = name);
  description && (category.description = description);

  const data = JSON.stringify(category);

  // [PUT] /api/categories/{categoryId} -> 카테고리 수정 요청
  try {
    const response = await fetch(API_URL + '/api/categories/' + categoryId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

button.addEventListener('click', handleClick);
