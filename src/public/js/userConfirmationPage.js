

const passwordInput = document.querySelector("#account-password");
const confirmPasswordInput = document.querySelector("#account-confirmPassword");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const saveButton = document.querySelector("#saveButton") 

// a태그 안에 button태그가 함께 있어서 링크 연결이 안 되는 부분을 해결하는 코드
saveButton.addEventListener("click", function(e) {
    e.preventDefault();
     const url = document.querySelector('.link-a').getAttribute('href');
     window.location.href = url;
})


// 패스워드가 8글자인지 확인 
passwordInput.addEventListener("input", function() {
  console.log(passwordInput.value.length);
  const passwordLength = passwordInput.value.length;

  if(passwordLength < 9) {
    password.classList.remove("block");
  } else {
    password.classList.add("block");
  }
})

// 패스워드가 동일한지


confirmPasswordInput.addEventListener("input", function() {
  console.log(confirmPasswordInput.value);
  console.log(passwordInput.value);
  if(confirmPasswordInput.value !== passwordInput.value) {
    confirmPassword.classList.remove("block");
  } else {
    confirmPassword.classList.add("block");
  }
})

