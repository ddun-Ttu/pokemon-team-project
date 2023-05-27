const usernameElm = document.querySelector('#username');
const emailElm = document.querySelector('#email');
const nicknameInputElm = document.querySelector('#nickname');
const passwordInput = document.querySelector('#account-password');
const confirmPasswordInput = document.querySelector('#account-confirmPassword');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirmPassword');

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

const API_URL = config.apiHost;

// 페이지 로드 시 기존 회원정보 불러오기
window.onload = async function getUserInfo() {
  await fetch(API_URL + `/api/users/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(data => {
      userData = data;
    });

  const { username, nickname, email } = userData;

  usernameElm.innerText = username;
  emailElm.innerText = email;
  nicknameInputElm.placeholder = nickname;
};

// 패스워드가 8글자인지 확인
passwordInput.addEventListener('input', function () {
  // console.log(passwordInput.value.length);
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

// 에러메세지
const errorMessage = document.createElement('p');
errorMessage.style.color = 'red';
errorMessage.style.fontSize = '12px';

// 빈값일 경우 경고창
const signUpForm = document.querySelector('#sign-up-form');
const signUpBut = document.querySelector('#saveButton');

signUpBut.addEventListener('click', async function (event) {
  event.preventDefault();

  // 채워진 값만 req.body로 전달
  let updatedData = {};

  if (nicknameInputElm.value) {
    updatedData['nickname'] = nicknameInputElm.value;
  } else if (passwordInput.value) {
    updatedData['password'] = passwordInput.value;
  } else {
    alert('수정된 항목이 없습니다.');
    window.location.replace('/users/mypage/edit');
  }

  await fetch(API_URL + `/api/users/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  })
    .then(res => res.json())
    .then(data => {
      resultData = data;
    });
  console.log(resultData);
  const result = resultData.ok;

  if (!result || result === false) {
    alert('회원정보 수정에 실패하였습니다. 다시 양식을 제출해주세요.');
    window.location.replace('/users/mypage/edit');
  } else {
    alert('회원정보 수정이 완료되었습니다.');
    window.location.replace('/users/mypage/edit');
  }
});
