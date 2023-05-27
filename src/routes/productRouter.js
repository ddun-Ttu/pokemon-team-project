import express from 'express';

const PATH_NAME = __dirname.split('/').slice(0, -1).join('/');

const productRouter = express.Router();

// 상폼 목록 페이지
productRouter.get('/', (req, res) => {
  const PAGE_NAME = 'products';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 상품 상세 페이지
productRouter.get('/:productId', (req, res) => {
  const PAGE_NAME = 'productsDetail';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

export default productRouter;
