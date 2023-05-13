let dummy = {
  categoryNameData: [
    '전체',
    '포켓몬',
    '몬스터볼',
    '사료',
    '진화의 돌',
    '악세서리',
    '인형',
  ],

  productData: [
    {
      _id: 1,
      img: 'url',
      name: '꼬부기',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 2,
      img: 'url',
      name: '메타몽',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 3,
      img: 'url',
      name: '이상해씨',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 4,
      img: 'url',
      name: '피카츄',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 0,
    },
    {
      _id: 5,
      img: 'url',
      name: '몬스터볼',
      price: 1000,
      categoryName: '몬스터볼',
      description: '긍지 높은 포켓몬',
      stock: 20,
    },
    {
      _id: 6,
      img: 'url',
      name: '메타몽',
      price: 1000,
      categoryName: '포켓몬',
      description: '긍지 높은 포켓몬',
      stock: 0,
    },
    {
      _id: 7,
      img: 'url',
      name: '몬스터볼',
      price: 1000,
      categoryName: '몬스터볼',
      description: '긍지 높은 포켓몬',
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

  getSelectedProductData(targetProperty, selector) {
    if (selector === '전체') {
      return this.productData;
    }

    return this.productData.filter(item => item[targetProperty] === selector);
  },
};
