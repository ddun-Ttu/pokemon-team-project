import express from "express";

const PATH_NAME = __dirname.split("/").slice(0, -1).join("/");

const rootRouter = express.Router();

// 메인 페이지
rootRouter.get("/", (req, res) => {
  const PAGE_NAME = "mainHome";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 상품 상세 페이지
rootRouter.get("/pokemons/:pokemonId", (req, res) => {
  const PAGE_NAME = "productDetail";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 장바구니 페이지
rootRouter.get("/carts", (req, res) => {
  const PAGE_NAME = "cart";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 주문결제 페이지
rootRouter.get("/orders", (req, res) => {
  const PAGE_NAME = "orderAndPayment";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 주문완료 페이지
rootRouter.get("/orders/end", (req, res) => {
  const PAGE_NAME = "orderComplete";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

export default rootRouter;
