const dummy = {};

dummy.categoryNameData = [
  '전체',
  '포켓몬',
  '몬스터볼',
  '사료',
  '진화의 돌',
  '악세서리',
  '인형',
];

let categoryNameData = [];

for (i = 0; i < 103; i++) {
  const [_id, img, name, price, description, stock] = [
    i,
    `이미지${i}`,
    `포켓몬${i}`,
    i * 1000,
    `긍지 높은 포켓몬. 긍지 높은 포켓몬. 긍지 높은 포켓몬. 긍지 높은 포켓몬. 긍지 높은 포켓몬. 긍지 높은 포켓몬. 긍지 높은 포켓몬. 긍지 높은 포켓몬. ${i}`,
    i,
  ];

  let categoryName;

  if (i < 100) {
    categoryName = '포켓몬';
  } else if (i < 200) {
    categoryName = '몬스터볼';
  } else if (i < 300) {
    categoryName = '사료';
  } else if (i < 400) {
    categoryName = '진화의 돌';
  }

  categoryNameData.push({
    _id,
    img,
    name,
    price,
    categoryName,
    description,
    stock,
  });
}

dummy.productData = categoryNameData;
dummy.getSelectedProductData = function (targetProperty, selector) {
  if (selector === '전체') {
    return this.productData;
  }

  return this.productData.filter(item => item[targetProperty] === selector);
};
