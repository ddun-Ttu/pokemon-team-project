// * 카테고리 목록 생성.
const cartegoryBar_categoryList_ul = document.querySelector(
  ".cartegoryBar-categoryList-ul"
);

let categoryListArray;

makeCategoryBar();

async function makeCategoryBar() {
  // const res = fetch(`${common.API_URL}/pokemons?물`);
  // const data = await JSON.parse(res);

  let data = ["물", "전기", "풀"];

  categoryListArray = ["전체", ...data];

  let categoryListLiHTML = "";

  categoryListArray.forEach((item) => {
    let typeColor;

    switch (item) {
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

    // if (item == "전체") {
    //   categoryListLiHTML += `<li><a href="/category/${item}" style="color: ${typeColor}";>${item}</a></li>`;
    // } else {
    categoryListLiHTML += `<li><a href="/category/${item}" id=${item} style="color: ${typeColor}";>${item}</a></li>`;
    // }
  });

  cartegoryBar_categoryList_ul.innerHTML += categoryListLiHTML;
}

makeProductList();

const allCategoryButton = document.querySelectorAll(
  ".cartegoryBar-categoryList-ul > li > a"
);

let selectedCategory;

allCategoryButton.forEach((item, index) => {
  const eachCategoryButton = allCategoryButton[index];

  eachCategoryButton.addEventListener("click", eachCategoryHandler);
});

function eachCategoryHandler(e) {
  e.preventDefault();

  allCategoryButton.forEach((item, index) => {
    item.classList.remove("selected");
  });

  e.target.classList.add("selected");

  selectedCategory = e.target.id;
  makeProductList(selectedCategory);
}

// * 선택된 카테고리의 상품 리스트 출력.
async function makeProductList(category) {
  const productListByCategory_list_ul = document.querySelector(
    ".productListByCategory-list-ul"
  );

  // alert(category);

  const res = await fetch(`${common.API_URL}/api/pokemons`);
  let data = await res.json();

  if (selectedCategory !== undefined && selectedCategory !== "전체") {
    data = data.filter(({ pokemonType }) => pokemonType == selectedCategory);
  }

  let liHTML = "";

  makeLiHTML();

  productListByCategory_list_ul.innerHTML = liHTML;

  // * 장바구니 버튼 기능
  let alreadyInCartData = JSON.parse(localStorage.getItem("cart"));

  const putInCartButton = document.querySelectorAll(
    ".productListByCategory-list-like-button"
  );

  data.forEach((item, index) => {
    putInCartButton[index].addEventListener("click", () => {
      if (alreadyInCartData == null) {
        // data 객체에 더해줄 필드.
        item.quantity = 1;
        item.checked = true;

        // data 객체에서 빼줄 필드.
        delete item.pokemonType;

        alreadyInCartData = [];
        alreadyInCartData.push(item);

        localStorage.setItem("cart", JSON.stringify(alreadyInCartData));
      } else {
        const findedIndex = alreadyInCartData.findIndex(
          ({ pokemonName }) => pokemonName == item.pokemonName
        );

        if (findedIndex == -1) {
          item.quantity = 1;
          item.checked = true;

          delete item.pokemonType;

          alreadyInCartData.push(item);

          localStorage.setItem("cart", JSON.stringify(alreadyInCartData));
        } else {
          alreadyInCartData[findedIndex].quantity++;
          localStorage.setItem("cart", JSON.stringify(alreadyInCartData));
        }
      }
    });
  });

  function makeLiHTML() {
    data.forEach((item) => {
      let { _id, pokemonImage, pokemonName, price, pokemonType } = item;
      console.log(pokemonImage);
      console.log((pokemonImage = common.API_URL + pokemonImage));
      price = Number(price).toLocaleString();

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

      // this.src='../img/피카츄.png';
      liHTML += `
    <li class="productListByCategory-list-li">
      <a href="/pokemons/${_id}">
        <div class="container-productListByCategory-list-image">
          <img class="productListByCategory-list-image" src=${pokemonImage} onerror="this.onerror=null " alt=""></img>
        </div>
        <div class="container-productListByCategory-list-description">
          <div class="container-productListByCategory-list-description-name">
            <div class="productListByCategory-list-description-name">${pokemonName}</div>
          </div>
          <div class="container-productListByCategory-list-description-price">
            <div class="productListByCategory-list-description-price">${price}원</div>
          </div>
          <div class="container-productListByCategory-list-description-type">
            <div class="productListByCategory-list-description-type"
              style="background-color: ${typeColor}">${pokemonType}</div>
          </div> 
        </div>
      </a>
      <div class="container-productListByCategory-list-description-like">
        <button class="productListByCategory-list-like-button">장바구니에 추가</button>
      </div>
    </li>`;
    });
  }
}
