const detail = document.querySelector(".detail");
const putInCartButton = document.querySelector(".description-cart");
const orderNowButton = document.querySelector(".description-order");
const countInput = document.querySelector("#count");
const pathname = window.location.pathname;

// async function findoneTest() {
//   console.log("Get 요청 시작");
//   let id = "644b8f2fa3cf661314438c15"; // Objectid값
//   console.log("id:", id);
//   let testobj = { _id: id };
//   console.log("obj:", testobj);
//   console.log(JSON.stringify(testobj));
//   const response = await fetch(common.API_URL + "/api/pokemons/" + id, {
//     method: "GET",
//   });

//   const data = await response.json();
//   console.log(data);
// }

// findoneTest();

makeDetail();

async function makeDetail() {
  const res = await fetch(`${common.API_URL}/api${pathname}`);
  const data = await res.json();

  let { pokemonImage, pokemonName, pokemonType, price, detailInfo } = data;

  pricetoLocaleString = Number(price).toLocaleString();
  pokemonImage = `../img/피카츄.png`;
  let typeColor;

  switch (pokemonType) {
    case "물":
      typeColor = "rgb(41, 146, 255)";
      break;
    case "전기":
      typeColor = "rgb(255, 219, 0)";
      break;
    case "풀":
      typeColor = "green";
      break;
  }

  const detailImage = document.querySelector(".container-detail-image");
  const detailDescriptionOne = document.querySelector(".one");

  detailImage.innerHTML = `
<div class="detail-image">
  <img class="detail-image-img" src=${pokemonImage} alt="">
</div>
`;

  detailDescriptionOne.innerHTML = `
<div class="detail-description">
  <div class="container-description-nameAndType">
    <div class="container-description-name">
      <div class="description-name">${pokemonName}</div>
    </div>
    <div class="container-description-type">
      <div class="description-type" style="background-color: ${typeColor}">${pokemonType}</div>
    </div>
  </div>
  <div class="container-description-price">
    <div class="description-price">${pricetoLocaleString}원</div>
  </div>
  <div class="container-description-description">
    <div class="description-description">${detailInfo}</div>
  </div>
</div>
`;
}

putInCartButton.addEventListener("click", putInCartButtonHandler);

orderNowButton.addEventListener("click", orderNowButtonHandler);

function putInCartButtonHandler() {
  let alreadyInCartData = JSON.parse(localStorage.getItem("cart"));

  const count = Number(countInput.options[countInput.selectedIndex].value);

  let data = {
    _id,
    pokemonName,
    price,
  };

  if (alreadyInCartData == null) {
    // data 객체에 더해줄 필드.
    data.quantity = count;
    data.checked = true;

    // data 객체에서 빼줄 필드.

    alreadyInCartData = [];
    alreadyInCartData.push(data);

    localStorage.setItem("cart", JSON.stringify(alreadyInCartData));
  } else {
    const findedIndex = alreadyInCartData.findIndex(
      (item) => item.pokemonName == pokemonName
    );

    if (alreadyInCartData !== null && findedIndex == -1) {
      data.quantity = count;
      data.checked = true;

      alreadyInCartData.push(data);

      localStorage.setItem("cart", JSON.stringify(alreadyInCartData));
    } else {
      alreadyInCartData[findedIndex].quantity += count;
      localStorage.setItem("cart", JSON.stringify(alreadyInCartData));
    }
  }
}

function orderNowButtonHandler() {
  const count = Number(countInput.options[countInput.selectedIndex].value);
  let quantity = count;

  let data = [
    {
      _id,
      pokemonName,
      price,
      quantity,
    },
  ];

  localStorage.setItem("order", JSON.stringify(data));
  window.location = "./orderAndPayment.html";
}
