// const e = require("express");

const RegisterProduct = document.querySelector("#but-sing-up");
const photoUpload = document.getElementById("photo-upload");
const preview = document.getElementById("preview");

// 사진 등록
photoUpload.addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  });

  reader.readAsDataURL(file);

  console.log(file);
});

// 인풋값 확인

// function checkInput(ev) {
//     ev.preventDefault();
//     const inputCh1 = document.querySelector("#prodeuct-name");
//     const inputCh2 = document.querySelector("#items");
//     const inputCh3 = document.querySelector("#summary");
//     const inputCh4 = document.querySelector("#detailed-description");
//     const inputCh5 = document.querySelector("#inventory");
//     const inputCh6 = document.querySelector("#price");

//     console.log(inputCh1.value);
//     console.log(inputCh2.value);
//     console.log(inputCh3.value);
//     console.log(inputCh4.value);
//     console.log(inputCh5.value);
//     console.log(inputCh6.value);

//     // 카테고리 확인
//     const select = document.getElementById("items");
//     select.addEventListener("change", function() {
//       const selectedValue = select.value;
//       console.log(selectedValue);
//     });
// }

// RegisterProduct.addEventListener("click", checkInput);

// 제품 추가 페이지의 필드에 데이터를 쓰고 req.body에 넣어 JSON으로 변환한다"는 것은 사용자가 입력한 데이터가 양식 필드에서 수집되어 req에 저장된다는 것을 의미합니다

const inputCh1 = document.querySelector("#prodeuct-name"); // 상품명
const inputCh2 = document.querySelector("#items"); // 카테고리
const inputCh3 = document.querySelector("#summary"); // 설명
// const inputCh4 = document.querySelector("#detailed-description"); // ?
// const inputCh5 = document.querySelector("#inventory"); // 번호
const inputCh6 = document.querySelector("#price"); // 가격
const photo = document.querySelector("#photo-upload"); // 사진

RegisterProduct.addEventListener("click", async (e) => {
  e.preventDefault();

  // 인풋에 들어온 값 상수에 담기
  const productNameInput = inputCh1.value;
  const itemsInput = inputCh2.value;
  const summaryInput = inputCh3.value;
  // const detailedDescriptionInput = inputCh4.value;
  // const inventoryInput = inputCh5.value;
  const priceInput = inputCh6.value;
  // const photoInput = photo.files[0];
  const photoInput = "photo-img-addr";
  console.log(photoInput);

  console.log({
    productNameInput,
    itemsInput,
    summaryInput,
    priceInput,
    photoInput,
  });

  // 로컬에서 데이터 가져옴
  const existingCategoryObjStr = localStorage.getItem("registratObj");
  // let existingCategoryObj = [];
  // 로컬 데이터가 null이 아닐경우 실행
  if (existingCategoryObjStr !== null) {
    existingCategoryObj = JSON.parse(existingCategoryObjStr);
  }

  //인풋값에 담기는 정보 상수에 담기
  const categoryObj = {
    pokemonName: productNameInput,
    pokemonType: itemsInput,
    detailInfo: summaryInput,
    // detailedDescription: detailedDescriptionInput,
    // inventory: inventoryInput,
    price: priceInput,
    pokemonImage: photoInput,
  };
  // existingCategoryObj.push(categoryObj);

  // 위에서 담은 상수를 JSON 후 setitem으로 담기
  // const updatedCategoryObjStr = JSON.stringify(existingCategoryObj);
  // const updatedCategoryObjStr = JSON.stringify(categoryObj);
  // localStorage.setItem("registratObj", updatedCategoryObjStr);

  // multer 전송위한 form 데이터 설정용
  // const formData = new FormData();
  // formData.append("pokemonName", productNameInput);
  // formData.append("pokemonType", itemsInput);
  // formData.append("detailInfo", summaryInput);
  // formData.append("price", priceInput);
  // formData.append("pokemonImage", photoInput);

  // console.log("폼 데이터 값 확인용 출력");
  // for (let key of formData.keys()) {
  //   console.log(key, ":", formData.get(key));
  // }

  // console.log(categoryObj);

  // [POST] /api/pokemons 요청
  await fetch(common.API_URL + "/api/pokemons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      // "Content-Type":
      //   "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    },
    body: JSON.stringify(categoryObj),
    // body: formData,
  });

  /*
  inputCh1.value = "";
  inputCh2.value = "전체";
  inputCh3.value = "";
  // inputCh4.value = "";
  // inputCh5.value = "";
  inputCh6.value = "";
  */
});
