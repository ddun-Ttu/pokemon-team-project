const button = document.querySelector("#categories-but");
const categoriesName = document.querySelector("#categories-name");
const explanation = document.querySelector("#explanation");

button.addEventListener("click", async function (e) {
  e.preventDefault();

  const categoryName = { categoryName: categoriesName.value };

  const updatedCategoryObjStr = JSON.stringify(categoryName);
  localStorage.setItem("categoryObj", updatedCategoryObjStr);

  categoriesName.value = "";

  // [POST] /api/categories 요청
  await fetch(common.API_URL + "/api/categories/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryName),
  });
  console.log(categoryName);
  console.log(categoryId);

  // 주소에서 카테고리 id값 추출
  const currUrl = window.location.href.split("/");
  currUrl.pop();
  const categoryId = currUrl.pop();
  console.log(currUrl);

  // GET 요청을 통해 기존 정보 업데이트
  async function updateInfo() {
    let id = categoryId; // Objectid값
    console.log("id:", id);
    let testobj = { _id: id };
    console.log("obj:", testobj);
    console.log(JSON.stringify(testobj));
    const response = await fetch(common.API_URL + "/api/categories/", {
      method: "GET",
    });
  }

  updateInfo();

  // [PUT] /api/category/{categoryId} 요청
  const id = categoryId;
  await fetch(common.API_URL + "/api/categories/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data",
      // "Content-Type":
      //   "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    },
    body: JSON.stringify(categoryObj),
    // body: formData,
  });
});
