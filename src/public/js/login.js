const passwordInput = document.querySelector("#login-password");
const loginInput = document.querySelector("#login-email");
const submitBut = Document.querySelector("#login-but");

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

loginBut.addEventListener("click", function (e) {
  e.preventDefault();

  console.log(passwordInput.value);
  console.log(loginInput.value);
});

// 토큰 받아서 세션 스토리지에 저장하는 로직
// 로그인 진행

import * as Api from "../api.js";
import {
  blockIfLogin,
  getUrlParams,
  validateEmail,
  createNavbar,
} from "../useful-functions.js";
const email = loginInput.value;
const password = passwordInput.value;
