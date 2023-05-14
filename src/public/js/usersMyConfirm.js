const passwordInput = document.querySelector('#account-password');
const password = document.querySelector('#password');
const confirmBtn = document.querySelector('#confirmButton');

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

confirmBtn.addEventListener('click', async e => {
  e.preventDefault();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  await fetch(API_URL + `/api/users/${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: passwordInput.value }),
  })
    .then(res => res.json())
    .then(data => {
      dataObj = data;
    });

  const result = dataObj.ok;

  if (!result || result === 'false') {
    alert('올바르지 않은 접근입니다.');
    window.location.replace('/');
    return;
  } else {
    console.log('올바른 접근입니다.');

    let urlArr = window.location.href.split('/');
    urlArr.pop();
    urlArr.push('edit');
    window.location.href = urlArr.join('/');
    return;
  }
});
