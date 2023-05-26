const productNameInput = document.querySelector('#product-name');
const categoryInput = document.querySelector('#categories');
const priceInput = document.querySelector('#price');
const stockInput = document.querySelector('#stock');
const descriptionInput = document.querySelector('#description');
const photoUpload = document.getElementById('photo_upload');
const preview = document.getElementById('preview');
const registerButton = document.querySelector('#but-sing-up');

const API_URL = config.apiHost;

async function handleChange() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', () => {
    preview.src = reader.result;
  });

  reader.readAsDataURL(file);
}

async function handleClick(e) {
  e.preventDefault();

  // multer 전송을 위한 form 데이터 설정
  const formData = new FormData();
  formData.append('name', productNameInput.value.trim());
  formData.append('category', categoryInput.value.trim());
  formData.append('price', priceInput.value);
  formData.append('stock', stockInput.value);
  const description = descriptionInput.value.trim();
  description.length !== 0 && formData.append('description', description);
  const img = photoUpload.files[0];
  img && formData.append('img', img);

  // [POST] /api/products -> 새 상품 생성 요청
  await fetch(API_URL + '/api/products', {
    method: 'POST',
    headers: {},
    body: formData,
  });
}

photoUpload.addEventListener('change', handleChange); // 사진 업로드
registerButton.addEventListener('click', handleClick); // 상품 등록
