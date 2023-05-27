import express from 'express';

const PATH_NAME = __dirname.split('/').slice(0, -1).join('/');

const rootRouter = express.Router();

// 홈 페이지
rootRouter.get('/', (req, res) => {
  const PAGE_NAME = 'home';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 장바구니 페이지
rootRouter.get('/cart', (req, res) => {
  const PAGE_NAME = 'cart';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 주문결제 페이지
rootRouter.get('/order', (req, res) => {
  const PAGE_NAME = 'order';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 주문완료 페이지
rootRouter.get('/order/end', (req, res) => {
  const PAGE_NAME = 'orderEnd';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

export default rootRouter;
