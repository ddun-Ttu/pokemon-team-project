const passwordInput = document.querySelector('#account-password');
const confirmPasswordInput = document.querySelector('#account-confirmPassword');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

let signUpName = document.querySelector('.name').value;
let signUpNickname = document.querySelector('.nickname').value;
let signUpEmail = document.querySelector('.email').value;
let signUpPassword = document.querySelector('.password').value;
let siginUpConfirmPassword = document.querySelector('.confirmPassword').value;

// 패스워드가 8글자인지 확인
passwordInput.addEventListener('input', function () {
  console.log(passwordInput.value.length);
  const passwordLength = passwordInput.value.length;

  if (passwordLength < 8) {
    password.classList.remove('block');
  } else {
    password.classList.add('block');
  }
});

// 패스워드가 동일한지
confirmPasswordInput.addEventListener('input', function () {
  console.log(confirmPasswordInput.value);
  console.log(passwordInput.value);
  if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPassword.classList.remove('block');
  } else {
    confirmPassword.classList.add('block');
  }
});

// 이메일
const emailInput = document.querySelector('.email');

// 에러메세지
const errorMessage = document.createElement('p');
errorMessage.style.color = 'red';
errorMessage.style.fontSize = '12px';

// 이메일 형식이 맞는지 확인
emailInput.addEventListener('input', function () {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.value)) {
    errorMessage.textContent = '이메일 형식에 맞게 작성해주세요';
    errorMessage.style.display = 'block';
    emailInput.parentNode.insertBefore(errorMessage, emailInput.nextSibling);
  } else {
    // errorMessage.textContent = '';
    errorMessage.style.display = 'none';
  }
});

// 빈값일 경우 경고창
const signUpForm = document.querySelector('#sign-up-form');
const signUpBut = document.querySelector('#saveButton');

signUpBut.addEventListener('click', async function (event) {
  console.log('dsf');
  event.preventDefault();
  const singUpInputs = signUpForm.querySelectorAll('input');

  for (let i = 0; i < singUpInputs.length; i++) {
    if (singUpInputs[i].value === '') {
      alert(
        singUpInputs[i].previousElementSibling.textContent +
          '을(를) 채워주세요',
      );
      return;
    }
  }

  const signupObj = {
    username: signUpName,
    nickname: signUpNickname,
    email: signUpEmail,
    password: signUpPassword,
    confirmPassword: siginUpConfirmPassword,
  };

  // [POST] /api/users/signup 요청
  await fetch(common.API_URL + '/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupObj),
  });
});

// 가입양식을 제출하는 함수
function handleSignUpSubmit(event) {
  event.preventDefault(); // submitting 막기
  console.log(event);
  console.log('handleSignUpSubmit 함수 입니다');

  // // 사용자가 입력한 값 변수로 지정
  // const signUpName = document.querySelector(".name").value;
  // const signUpUsername = document.querySelector(".username").value;
  // const signUpEmail = document.querySelector(".email").value;
  // const signUpPassword = document.querySelector(".password").value;
  // const siginUpConfirmPassword =
  //   document.querySelector(".confirmPassword").value;
  signUpName = document.querySelector('.name').value;
  signUpNickname = document.querySelector('.nickname').value;
  signUpEmail = document.querySelector('.email').value;
  signUpPassword = document.querySelector('.password').value;
  siginUpConfirmPassword = document.querySelector('.confirmPassword').value;

  console.log('입력확인');
  console.log({
    signUpName,
    signUpNickname,
    signUpEmail,
    signUpPassword,
    siginUpConfirmPassword,
  });
}

signUpForm.addEventListener('input', handleSignUpSubmit);
