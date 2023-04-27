const navBar = document.querySelector('nav');

fetch('/views/common/navBar.html')
.then(res => res.text())
.then(data => navBar.innerHTML = data);