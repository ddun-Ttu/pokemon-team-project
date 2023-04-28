const passwordInput = document.querySelector("#login-password");
const loginInput = document.querySelector("#login-email");

//에러 메세지
const errorMessage = document.createElement("p");
errorMessage.style.color = "red";
errorMessage.style.fontSize = "12px";

//이메일 형식이 맞는지 확인
loginInput.addEventListener("input", function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(this.value)) {
    errorMessage.textContent = "이메일 형식에 맞게 작성해주세요";
    errorMessage.style.display = "block";
    loginInput.parentNode.insertBefore(errorMessage, loginInput.nextSibling);
  } else {
    errorMessage.style.display = "none";
  }
  if (loginInput.value.length === 0) {
    errorMessage.style.display = "none";
  }
});

// Input 값 확인하기
const loginBut = document.querySelector("#login-but");

loginBut.addEventListener("click", async function (e) {
  e.preventDefault();

  console.log();
  console.log();

  const logObj = {
    email: loginInput.value,
    password: passwordInput.value,
  };
  // 로그인 api 요청
  // [POST] /api/users/login 요청

  let dataObj;
  await fetch(common.API_URL + "/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logObj),
  })
    .then((res) => res.json())
    .then((data) => {
      dataObj = data;
    });

  const { token } = dataObj;
  if (token !== undefined) {
    let urlArr = window.location.href.split("/");
    urlArr.pop();
    urlArr.pop();
    window.location.href = urlArr.join("/");
  }
});
