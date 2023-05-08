const RegisterProduct = document.querySelector('#but-sing-up');
const photoUpload = document.getElementById('photo-upload');
const preview = document.getElementById('preview');

// 입력 필드
const inputCh1 = document.querySelector('#prodeuct-name'); // 상품명
const inputCh2 = document.querySelector('#items'); // 카테고리
const inputCh3 = document.querySelector('#inventory'); // 설명
// const inputCh4 = document.querySelector("#detailed-description"); // 자세한설명
const inputCh5 = document.querySelector('#inventory'); // 번호
const inputCh6 = document.querySelector('#price'); // 가격
const photo = document.querySelector('#photo-upload'); // 사진

// 주소에서 포켓몬 id값 추출
const currUrl = window.location.href.split('/');
currUrl.pop();
const pokemonId = currUrl.pop();
console.log(pokemonId);

// GET 요청을 통해 기존 정보 업데이트
async function updateInfo() {
  console.log('Get 요청 시작');
  let id = pokemonId; // Objectid값
  console.log('id:', id);
  let testobj = { _id: id };
  console.log('obj:', testobj);
  console.log(JSON.stringify(testobj));
  const response = await fetch(common.API_URL + '/api/pokemons/' + id, {
    method: 'GET',
  });

  // 기존 정보로 업데이트
  const data = await response.json();
  console.log(data);
  const { pokemonName, pokemonType, price, detailInfo } = data;

  inputCh1.value = pokemonName;
  for (let i = 0; i < inputCh2.options.length; i++) {
    if (inputCh2.options[i].innerText === pokemonType) {
      inputCh2.value = inputCh2.options[i].value;
      break;
    }
  }
  inputCh3.value = detailInfo;
  inputCh6.value = price;
}

updateInfo();

// 사진 등록
photoUpload.addEventListener('change', function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function () {
    preview.src = reader.result;
  });

  reader.readAsDataURL(file);

  console.log(file);
});

// 인풋값 확인

async function checkInput(ev) {
  ev.preventDefault();

  console.log(inputCh1.value);
  console.log(inputCh2.value);
  console.log(inputCh3.value);
  // console.log(inputCh4.value);
  // console.log(inputCh5.value);
  console.log(inputCh6.value);

  // 카테고리 확인
  const select = document.getElementById('items');
  select.addEventListener('change', function () {
    const selectedValue = select.value;
    console.log(selectedValue);
  });

  // 수정값 생성
  const photoInput = photo.files[0];
  // const categoryObj = {
  //   pokemonName: inputCh1.value,
  //   pokemonType: inputCh2.value,
  //   detailInfo: inputCh3.value,
  //   price: inputCh6.value,
  //   pokemonImage: photoInput,
  // };

  // console.log(categoryObj);

  // multer 전송위한 form 데이터 설정용
  const formData = new FormData();
  formData.append('pokemonName', inputCh1.value);
  formData.append('pokemonType', inputCh2.value);
  formData.append('detailInfo', inputCh3.value);
  formData.append('price', inputCh6.value);
  formData.append('pokemonImage', photoInput);

  // [PUT] /api/pokemons/{pokemonId} 요청
  const id = pokemonId;
  await fetch(common.API_URL + '/api/pokemons/' + id, {
    method: 'PUT',
    headers: {
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      // "Content-Type":
      //   "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    },
    // body: JSON.stringify(categoryObj),
    body: formData,
  });
}

RegisterProduct.addEventListener('click', checkInput);
