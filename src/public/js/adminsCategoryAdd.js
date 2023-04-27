const button = document.querySelector("#categories-but");
const categoriesName = document.querySelector("#categories-name");
const explanation = document.querySelector("#explanation");

// 버튼 클릭하면
button.addEventListener("click", function (e) {
  e.preventDefault();
  // 인풋에 들어온 값 상수에 담기
  const categoriesNameInput = categoriesName.value;
  const explanationInput = explanation.value;

  // 로컬에서 데이터 가져옴
  const existingCategoryObjStr = localStorage.getItem("categoryObj");
  let existingCategoryObj = [];
  // 로컬 데이터가 null이 아닐경우 실행
  if (existingCategoryObjStr !== null) {
    existingCategoryObj = JSON.parse(existingCategoryObjStr);
  }

  // 인풋값에 담기는 정보 상수에 담기
  const categoryObj = { name: categoriesNameInput, ex: explanationInput };
  existingCategoryObj.push(categoryObj);

  // 위에서 담긴 상수를 JSON
  const updatedCategoryObjStr = JSON.stringify(existingCategoryObj);
  localStorage.setItem("categoryObj", updatedCategoryObjStr);

  categoriesName.value = "";
  explanation.value = "";

  console.log(categoriesName.value);
  console.log(explanation.value);
});
