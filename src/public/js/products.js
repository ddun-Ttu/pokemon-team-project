const cartegoryBar_categoryList_ul = document.querySelector(
  '.cartegoryBar-categoryList-ul',
);
const productListByCategory_list_ul = document.querySelector(
  '.productListByCategory-list-ul',
);

// 더미 데이터)

const dummy = {
  categoryNameData: [
    { main: '포켓몬', sub: ['물', '불', '풀', '전기'] },
    { main: '몬스터볼' },
    { main: '사료' },
    { main: '진화의 돌' },
    { main: '악세서리' },
    { main: '인형' },
  ],
  productData: [
    {
      _id: 1,
      img: 'url',
      name: '꼬부기',
      price: 1000,
      categoryName: '포켓몬',
      stock: 20,
    },
    {
      _id: 2,
      img: 'url',
      name: '메타몽',
      price: 1000,
      categoryName: '포켓몬',
      stock: 20,
    },
    {
      _id: 3,
      img: 'url',
      name: '이상해씨',
      price: 1000,
      categoryName: '포켓몬',
      stock: 20,
    },
    {
      _id: 4,
      img: 'url',
      name: '피카츄',
      price: 1000,
      categoryName: '포켓몬',
      stock: 0,
    },
    {
      _id: 5,
      img: 'url',
      name: '몬스터볼',
      price: 1000,
      categoryName: '몬스터볼',
      stock: 20,
    },
    {
      _id: 6,
      img: 'url',
      name: '메타몽',
      price: 1000,
      categoryName: '포켓몬',
      stock: 0,
    },
    {
      _id: 7,
      img: 'url',
      name: '몬스터볼',
      price: 1000,
      categoryName: '몬스터볼',
      stock: 20,
    },
    {
      _id: 8,
      img: 'url',
      name: '피카츄',
      price: 1000,
      categoryName: '포켓몬',
      stock: 20,
    },
  ],
};

let categoryNameData = dummy.categoryNameData.map(item => {
  return item.main;
});

let productData = dummy.productData;

// 카테고리바 제작
let categoryListHTML = '';

categoryNameData.forEach(item => {
  categoryListHTML += `<li data-id=${item}>${item}</li>`;
});

cartegoryBar_categoryList_ul.insertAdjacentHTML('beforeend', categoryListHTML);

const categoryListButton = document.querySelectorAll(
  '.cartegoryBar-categoryList-ul > li',
);

categoryListButton.forEach((item, index) => {
  const eachCategoryListButton = categoryListButton[index];

  eachCategoryListButton.addEventListener('click', () => {
    const categoryName = item.dataset.id;

    // fetch(`api/products?category=${categoryName}`)
    //   .then(res => res.json())
    //   .then(res => {})
    //   .catch(ddd => console.log(new Error(ddd)));

    // const filteredData = productData.filter(
    //   item => item.categoryName == categoryName,
    // );

    // console.log(filteredData);

    makeProductList(categoryName);
  });
});

makeProductList('포켓몬');

function makeProductList(categoryName) {
  // fetch(`api/products?category=${categoryName}`)
  //   .then(res => res.json())
  //   .then(res => {

  const filteredData = productData.filter(
    item => item.categoryName == categoryName,
  );

  let productListHTML = '';

  // res.forEach(({ _id, img, name, price, categoryName, stock }) => {
  filteredData.forEach(({ _id, img, name, price, categoryName, stock }) => {
    productListHTML += `
          <li class="productListByCategory-list-li">
            <a href="/products/${_id}">
              <div class="container-productListByCategory-list-image">
                <img class="productListByCategory-list-image" src=${img} onerror="this.onerror=null; this.src='/imgs/모래두지.png';" alt=""></img>
              </div>
              <div class="container-productListByCategory-list-description">
                <div img="container-productListByCategory-list-description-name">
                  <div class="productListByCategory-list-description-name">${name}</div>
                </div>
                <div class="container-productListByCategory-list-description-price">
                  <div class="productListByCategory-list-description-price">${price}원</div>
                </div>
                <div class="container-productListByCategory-list-description-type">
                  <div class="productListByCategory-list-description-type">${categoryName}</div>
                </div>
              </div>
            </a>
            <div class="container-productListByCategory-list-description-like">
              <button class="productListByCategory-list-like-button">장바구니에 추가</button>
            </div>
          </li>
          `;
  });

  productListByCategory_list_ul.textContent = '';
  productListByCategory_list_ul.insertAdjacentHTML(
    'beforeend',
    productListHTML,
  );
  // });
}

// function makeProductList(category) {
//   const productListByCategory_list_ul = document.querySelector(
//     ".productListByCategory-list-ul"
//   );

//   const res = await fetch(`${common.API_URL}/api/pokemons`);
//   let data = await res.json();

//   if (selectedCategory !== undefined && selectedCategory !== "전체") {
//     data = data.filter(({ pokemonType }) => pokemonType == selectedCategory);
//   }

//   let liHTML = "";

//   makeLiHTML();

//   productListByCategory_list_ul.innerHTML = liHTML;

// pokemonCategoryListData

// productCategoryList_li.forEach((item) => {
//   item.addEventListener("click", () => {
//     let productCategoryList2HTML = '';

//   });
// });

//     let categoryListLiHTML = "";

//     categoryNameData.forEach((item) => {
//       let typeColor;

//       switch (item) {
//         case "물":
//           typeColor = "rgb(41, 146, 255)";
//           break;
//         case "전기":
//           typeColor = "rgb(255, 219, 0)";
//           break;
//         case "풀":
//           typeColor = "green";
//           break;
//       }

//       categoryListLiHTML += `<li><a href="#" id=${item} style="color: ${typeColor}";>${item}</a></li>`;
//     });

//     cartegoryBar_categoryList_ul.innerHTML += categoryListLiHTML;

// // 카테고리 바 버튼에 리스너 부착.
// const allCategoryButton = document.querySelectorAll(
//   ".cartegoryBar-categoryList-ul > li > a"
// );

// let selectedCategory;

// allCategoryButton.forEach((item, index) => {
//   const eachCategoryButton = allCategoryButton[index];

//   eachCategoryButton.addEventListener("click", eachCategoryHandler);
// });

// function eachCategoryHandler(e) {
//   e.preventDefault();

//   // 카테고리 항목 클릭 시 해당 항목 배경색 변경.
//   allCategoryButton.forEach((item, index) => {
//     item.classList.remove("selected");
//   });

//   e.target.classList.add("selected");

//   selectedCategory = e.target.id;
//   makeProductList(selectedCategory);
// }
// makeProductList();

// // * 선택된 카테고리의 상품 리스트 출력.
// async function makeProductList(category) {
//   const productListByCategory_list_ul = document.querySelector(
//     ".productListByCategory-list-ul"
//   );

//   const res = await fetch(`${common.API_URL}/api/pokemons`);
//   let data = await res.json();

//   if (selectedCategory !== undefined && selectedCategory !== "전체") {
//     data = data.filter(({ pokemonType }) => pokemonType == selectedCategory);
//   }

//   let liHTML = "";

//   makeLiHTML();

//   productListByCategory_list_ul.innerHTML = liHTML;

//   // * 장바구니 버튼 기능
//   let alreadyInCartData = JSON.parse(localStorage.getItem("cart"));

//   const putInCartButton = document.querySelectorAll(
//     ".productListByCategory-list-like-button"
//   );

//   data.forEach((item, index) => {
//     putInCartButton[index].addEventListener("click", () => {
//       if (alreadyInCartData == null) {
//         // data 객체에 더해줄 필드.
//         item.quantity = 1;
//         item.checked = true;

//         // data 객체에서 빼줄 필드.
//         delete item.pokemonType;

//         alreadyInCartData = [];
//         alreadyInCartData.push(item);

//         localStorage.setItem("cart", JSON.stringify(alreadyInCartData));
//       } else {
//         img findedIndex = alreadyInCartData.findIndex(
//           ({ name }) => name == item.name
//         );

//         if (findedIndex == -1) {
//           item.quantity = 1;
//           item.checked = true;

//           delete item.pokemonType;

//           alreadyInCartData.push(item);

//           localStorage.setItem("cart", JSON.stringify(alreadyInCartData));
//         } else {
//           alreadyInCartData[findedIndex].quantity++;
//           localStorage.setItem("cart", JSON.stringify(alreadyInCartData));
//         }
//       }
//     });
//   });

//   function makeLiHTML() {
//     data.forEach((item) => {img
//       let { _id, pokemonImage, name, price, pokemonType } = item;
//       console.log(pokemonImage);
//       console.log((pokemonImage = common.API_URL + pokemonImage));
//       price = Number(price).toLocaleString();

//       let typeColor;

//       switch (pokemonType) {
//         case "물":
//           typeColor = "rgb(41, 146, 255)";
//           break;
//         case "전기":
//           typeColor = "rgb(255, 219, 0)";
//           break;
//         case "풀":
//           typeColor = "green";
//           break;
//       }

//       // this.src='../img/피카츄.png';
//       liHTML += `
//     <li class="productListByCategory-list-li">
//       <a href="/pokemons/${_id}">
//         <div class="container-productListByCategory-list-image">
//           <img class="productListByCategory-list-image" src=${pokemonImage} onerror="this.onerror=null " alt=""></img>
//         </div>
//         <div class="container-productListByCategory-list-description">
//           <div img="container-productListByCategory-list-description-name">
//             <div class="productListByCategory-list-description-name">${name}</div>
//           </div>
//           <div class="container-productListByCategory-list-description-price">
//             <div class="productListByCategory-list-description-price">${price}원</div>
//           </div>
//           <div class="container-productListByCategory-list-description-type">
//             <div class="productListByCategory-list-description-type"
//               style="background-color: ${typeColor}">${pokemonType}</div>
//           </div>
//         </div>
//       </a>
//       <div class="container-productListByCategory-list-description-like">
//         <button class="productListByCategory-list-like-button">장바구니에 추가</button>
//       </div>
//     </li>`;
//     });
//   }
// }
