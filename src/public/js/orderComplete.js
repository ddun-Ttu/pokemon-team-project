const goOrderListButton = document.querySelector("#button-button1");

console.log(common);

goOrderListButton.addEventListener("click", goOrderListButtonHandler);

async function goOrderListButtonHandler() {
  const user = JSON.parse(localStorage.getItem("user"));

  window.location = `/orderStatus/${user.id}`;
}
