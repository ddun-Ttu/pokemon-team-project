/*

<구현 목록 및 방법>

* 페이지 로드 시
1. 카테고리 목록 생성.
  - 카테고리 리스트의 ul를 잡아 변수에 할당.
  - 관리자가 지정해놓은 취급 포켓몬 종류 데이터를 /??? 경로에서 get 요청으로 가져옴.
  - (객체들이 잔뜩 저장된 배열 데이터를 전송받는다고 가정.) 
  - .forEach 등으로 반복문을 실행. 잡아둔 ul 요소에 innerHTML +=로 <li><a></a></li> 형태로 차례대로 삽입.
  - a 태그에는 해당 url로 이동할 수 있는 url get 요청 링크를 할당.
    - 아마 데이터에 있을 것.
  - 가장 첫 번째 카테고리는 항상 전체여야 함.

* 카테고리 버튼 클릭 시
1. 해당 카테고리에 속한 포켓몬들의 데이터를 서버에 요청하고 데이터를 리스트로 가공해 출력. 
  - ul.innerHTML +=
  - 받아온 데이터를 사용해서 변수만 잘 할당해주면 될 것.
2. 선택한 카테고리 밑에 밑줄 생성. 기존의 밑줄은 제거.
  - class="active" 지우고 삽입하는 식으로 구현하면 될 듯.
3. 타입 배찌의 문구/색상을 해당 카테고리에 맞게 수정.
  - 데이터 중 타입 필드 값이랑 조건문으로 지정해줘야겠다.

* 특정 포켓몬 클릭 시
1. 해당 포켓몬의 상세 페이지로 이동.
  - innerHTML 삽입 시 a 태그에 링크 작성.

* 찜하기 선택 시
  - 뭐.. 하지? 찜했습니다!!!!!! 출력? 부모님한테 푸시 보내기? 장바구니에 담기랑 다른 건가???
  - 버튼 형태를 수정했더니 클릭 시 눌리는 효과가 안 나옴. 음음음.. transition 같은 걸로 보완해줄 수 있을지도..
*/

// @카테고리 목록 생성.
const cartegoryBar_categoryList_ul = document.querySelector('.cartegoryBar-categoryList-ul');

makeCategoryBar();

async function makeCategoryBar() {
  // const res = await fetch('/???');
  // const data = await res.json();
  // 데이터 받았다 치고,

  // 관리자가 지정한 카테고리 데이터.
  const data = [ { _id : 1, type : '물' }, { _id : 2, type : '전기' }, { _id : 3, type : '풀' }, 
  // { _id : 4, type : '바람' }, { _id : 5, type : '바위' }, { _id : 6, type : '용기' },  { _id : 7, type : '권력' }, { _id : 8, type : '고통' }, { _id : 9, type : '프롤레타리아' }, { _id : 10, type : '자본가' }, { _id : 11, type : '혁명가' }, 
];

  data.forEach(item => {
    cartegoryBar_categoryList_ul.innerHTML += `<li><a href="/category/${item._id}" id=${item._id}>${item.type}</a></li>`
  })
}

// @선택된 카테고리의 상품 리스트 출력.
const productListByCategory_list_ul = document.querySelector('.productListByCategory-list-ul');

const data = [];

for(i = 0; i < 50; i++) {
  
  const product = {
    name: '이상해씨',
    price: 12500,
    type: '풀',
  }

  data.push(product);
}

// 데이터 받았다 치고,

for(i = 0; i < data.length; i++) {
  
  let { name, price, type } = data[i];

  price = Number(price).toLocaleString();
  const image = `../../img/${name}.png`;

  let typeColor;
  
  if(type == '물') {
    typeColor = 'blue'; 
  }
  else if(type == '전기') {
    typeColor = 'rgb(255, 219, 0)';
  }
  else if(type == '풀') {
    typeColor = 'green';
  }

  productListByCategory_list_ul.innerHTML += 
    `<li class="productListByCategory-list-li">
      <a href="">
        <div class="container-productListByCategory-list-image">
          <img class="productListByCategory-list-image" src=${image} alt="">
        </div>
        <div class="container-productListByCategory-list-description">
          <div class="container-productListByCategory-list-description-name">
            <div class="productListByCategory-list-description-name">${name}</div>
          </div>
          <div class="container-productListByCategory-list-description-price">
            <div class="productListByCategory-list-description-price">${price}원</div>
          </div>
          <div class="container-productListByCategory-list-description-type">
            <div class="productListByCategory-list-description-type"
              style="background-color: ${typeColor}">${type}</div>
            <div class="productListByCategory-list-description-type2">타입2</div>
          </div> 
        </div>
      </a>
      <div class="container-productListByCategory-list-description-like">
        <button class="productListByCategory-list-like-button">찜하기</button>
      </div>
    </li>`
}
