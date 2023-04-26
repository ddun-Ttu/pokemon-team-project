const goOrderListButton = document.querySelector('#button-button1');

goOrderListButton.addEventListener('click', goOrderListButtonHandler);

function goOrderListButtonHandler() {
  const user = JSON.parse(localStorage.getItem('user'));

  window.location = `.../${user.id}`;
}