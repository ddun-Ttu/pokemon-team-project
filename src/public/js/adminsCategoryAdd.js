const button = document.querySelector("#categories-but");
const categoriesName = document.querySelector("#categories-name");
const explanation = document.querySelector("#explanation");

//임의로 더미 만들기
button.addEventListener("click", function(e) {
  e.preventDefault();
  const categoriesNameInput = categoriesName.value;
  const explanationInput = explanation.value;

  const existingCategoryObjStr = localStorage.getItem("categoryObj");
  let existingCategoryObj = [];
  if (existingCategoryObjStr !== null) {
    existingCategoryObj = JSON.parse(existingCategoryObjStr);
  }

  const categoryObj = { name: categoriesNameInput, ex: explanationInput };
  existingCategoryObj.push(categoryObj);

  const updatedCategoryObjStr = JSON.stringify(existingCategoryObj);
  localStorage.setItem("categoryObj", updatedCategoryObjStr);

  categoriesName.value = "";
  explanation.value = "";

  console.log(categoriesName.value);
  console.log(explanation.value);
});