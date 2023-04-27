const passwordInput = document.querySelector("#login-password");
const loginInput = document.querySelector("#login-email");

//에러 메세지
const errorMessage = document.createElement("p");
errorMessage.style.color ="red";
errorMessage.style.fontSize = "12px";

//이메일 형식이 맞는지 확인
loginInput.addEventListener("input", function () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.value)) {
      errorMessage.textContent = "이메일 형식에 맞게 작성해주세요";
      errorMessage.style.display = "block";
      loginInput.parentNode.insertBefore(errorMessage, loginInput.nextSibling);
    } 
    else {
      errorMessage.style.display = "none";
    }
    if ( loginInput.value.length === 0){
        errorMessage.style.display = "none";
    }
  });

  // Input 값 확인하기
  const loginBut = document.querySelector("#login-but");

  loginBut.addEventListener("click", function(e) {
    e.preventDefault();

    console.log(passwordInput.value);
    console.log(loginInput.value);
  })
  
