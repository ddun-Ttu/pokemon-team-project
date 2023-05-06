import express from 'express';

const PATH_NAME = __dirname.split('/').slice(0, -1).join('/');

const userRouter = express.Router();

// 회원가입 페이지
userRouter.get('/signup', (req, res) => {
  const PAGE_NAME = 'signUp';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 로그인 페이지
userRouter.get('/login', (req, res) => {
  const PAGE_NAME = 'login';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 개인 페이지
userRouter.get('/mypage', (req, res) => {
  const PAGE_NAME = 'myPage';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 사용자 확인 페이지
userRouter.get('/mypage/confirm', (req, res) => {
  const PAGE_NAME = 'userConfirmationPage';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 사용자 정보 수정 페이지
userRouter.get('/mypage/edit', (req, res) => {
  const PAGE_NAME = 'userAccount';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 사용자 주문 목록 조회 페이지
userRouter.get('/mypage/orders', (req, res) => {
  const PAGE_NAME = 'orderStatus';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 사용자 주문 수정 페이지
userRouter.get('/mypage/orders/:orderId/edit', (req, res) => {
  const PAGE_NAME = 'userEditOrder';

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

export default userRouter;
