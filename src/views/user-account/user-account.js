

const passwordInput = document.querySelector("#account-password");
const confirmPasswordInput = document.querySelector("#account-confirmPassword");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");


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