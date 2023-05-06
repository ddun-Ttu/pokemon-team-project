const navBar = document.querySelector('nav');

fetch('/views/common/navBar.html')
  .then(res => res.text())
  .then(data => (navBar.innerHTML = data))
  .then(() => {
    const navLogOut = document.querySelector('.log-out');

    navLogOut.addEventListener('click', navLogOutHandler);

    function navLogOutHandler(e) {
      e.preventDefault();

      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');

      alert('로그아웃되었습니다.');

      window.location.replace('./mainHome.html');
    }
  })
  .then(() => {
    const notLogIn = document.querySelectorAll('.not-logged-in');
    const logIn = document.querySelectorAll('.logged-in');
    const regardlessOfLogIn = document.querySelector(
      '.Regardless-of-logged-in',
    );
    const adminOnly = document.querySelector('.admin-only');
    const userOnly = document.querySelector('.user-only');

    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    // 비회원
    if (!token) {
      for (let nav of logIn) {
        nav.style.display = 'none';
      }
      // 회원
    } else if (token && !isAdmin) {
      for (let nav of notLogIn) {
        nav.style.display = 'none';
      }

      adminOnly.style.display = 'none';
      // 관리자
    } else if (isAdmin) {
      for (let nav of notLogIn) {
        nav.style.display = 'none';
      }

      userOnly.style.display = 'none';
      regardlessOfLogIn.style.display = 'none';
    }
  });
