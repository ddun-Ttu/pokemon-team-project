const passwordInput = document.querySelector(".password");
const emailInput = document.querySelector(".email");
const loginBut = document.querySelector("#login-but");

//에러 메세지
const errorMessage = document.createElement("p");
errorMessage.style.color ="red";
errorMessage.style.fontSize = "12px";

//이메일 형식이 맞는지 확인
emailInput.addEventListener("input", function (event) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(event.target.value)) {
      errorMessage.textContent = "이메일 형식에 맞게 작성해주세요";
      errorMessage.style.display = "block";
      emailInput.parentNode.insertBefore(errorMessage, emailInput.nextSibling);
    } 
    else {
      errorMessage.style.display = "none";
    }
    if ( emailInput.value.length === 0){
        errorMessage.style.display = "none";
    }
  });

  loginBut.addEventListener('click', function(e) {
    e.preventDefault;
    
    })