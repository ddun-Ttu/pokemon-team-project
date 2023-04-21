const passwordInput = document.querySelector(".password");
const emailInput = document.querySelector(".email");
const confirmPasswordInput = document.querySelector(".confirmPassword");

// 에러메세지
const errorMessage = document.createElement("p");
errorMessage.style.color = "red";
errorMessage.style.fontSize = "12px";

// 패스워드 8글자 이상인지 확인
passwordInput.addEventListener("input", function () {
  if (this.value.length > 0 && this.value.length < 8) {
    errorMessage.textContent = "8자리 이상 입력해주세요";
    errorMessage.style.display = "block";
    passwordInput.parentNode.insertBefore(
      errorMessage,
      passwordInput.nextSibling
    );
  } else {
    errorMessage.style.display = "none";
  }
  
});

// 패스워드가 동일한지 확인
confirmPasswordInput.addEventListener("input", function () {
  if (this.value !== passwordInput.value) {
    errorMessage.textContent = "Passwords do not match";
    errorMessage.style.display = "block";
    confirmPasswordInput.parentNode.insertBefore(
      errorMessage,
      confirmPasswordInput.nextSibling
    );
  } else {
    errorMessage.style.display = "none";
  }
});

// 이메일 형식이 맞는지 확인
emailInput.addEventListener("input", function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.value)) {
    errorMessage.textContent = "이메일 형식에 맞게 작성해주세요";
    errorMessage.style.display = "block";
    emailInput.parentNode.insertBefore(errorMessage, emailInput.nextSibling);
  } else {
    // errorMessage.textContent = '';
    errorMessage.style.display = "none";
  }
});

// 빈값일 경우 경고창
const signUpForm = document.querySelector("#sign-up-form");
const signUpBut = document.querySelector(".but-sing-up");

signUpBut.addEventListener("click", function (event) {
  event.preventDefault();
  const singUpInputs = signUpForm.querySelectorAll("input");

  for (let i = 0; i < singUpInputs.length; i++) {
    if (singUpInputs[i].value === "") {
      alert(
        singUpInputs[i].previousElementSibling.textContent + "을(를) 채워주세요"
      );
      return;
    }
  }

  //   모든 값이 채워지면 양식 제출
  form.submit();
});

// 가입양식을 제출하는 함수
function handleSignUpSubmit(event) {
  event.preventDefault(); // submitting 막기

  // 사용자가 입력한 값 변수로 지정
  const signUpName = document.querySelector('input[name="name"]').value;
  const signUpUsername = document.querySelector('input[name="username"]').value;
  const signUpEmail = document.querySelector('input[name="email"]').value;
  const signUpPassword = document.querySelector('input[name="password"]').value;
  const siginUpConfirmPassword = document.querySelector(
    'input[name="confirmPassword"]'
  ).value;

  // 사용자 입력 확인
  if (
    validateInput(
      signUpName,
      signUpUsername,
      signUpEmail,
      signUpPassword,
      siginUpConfirmPassword
    )
  ) {
    // 사용자등록 및 사용자를 로그인 페이지로 리디렉션
    window.location.href = "login.html";
  } else {
    // 오류 메세지 표시
    alert("잘못된 입력입니다.");
    //   const error = document.getElementById("error");
    //   error.innerHTML = "Invalid input.";
  }
}

//가입 양식에 이벤트 리스너 추가
function addSignUpListeners() {
  const signUpForm = document.querySelector("#sign-up-form");
  signUpForm.addEventListener("submit", handleSignUpSubmit);
}
