import express from 'express';

const PATH_NAME = __dirname.split('/').slice(0, -1).join('/');

const adminRouter = express.Router();

// 관리자 페이지
adminRouter.get('/', (req, res) => {
  const PAGE_NAME = 'admins';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 상품 목록 조회 및 관리 페이지
adminRouter.get('/products', (req, res) => {
  const PAGE_NAME = 'adminsProducts';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 상품 추가 페이지
adminRouter.get('/products/add', (req, res) => {
  const PAGE_NAME = 'adminsProductsAdd';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 상품 수정 페이지
adminRouter.get('/products/:productId/edit', (req, res) => {
  const PAGE_NAME = 'adminsProductsEdit';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 주문 목록 조회 및 관리 페이지
adminRouter.get('/orders', (req, res) => {
  const PAGE_NAME = 'adminsOrders';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 카테고리 목록 조회 및 관리 페이지
adminRouter.get('/categories', (req, res) => {
  const PAGE_NAME = 'adminsCategories';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 카테고리 추가 페이지
adminRouter.get('/categories/add', (req, res) => {
  const PAGE_NAME = 'adminsCategoriesAdd';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 카테고리 수정 페이지
adminRouter.get('/categories/:categoryId/edit', (req, res) => {
  const PAGE_NAME = 'adminsCategoriesEdit';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

export default adminRouter;
