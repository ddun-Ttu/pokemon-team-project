import express from "express";

const rootRouter = express.Router();

// const PATH_NAME = __dirname.split("/").slice(0, -1).join("/");

// 메인 페이지
rootRouter.get("/", (req, res) => {
  res.send("메인 페이지");
});

// 상품 상세 페이지
rootRouter.get("/pokemons/:pokemonId", (req, res) => {
  res.send("상품 상세 페이지");
});

// 장바구니 페이지
rootRouter.get("/carts", (req, res) => {
  res.send("장바구니 페이지");
});

// 주문결제 페이지
rootRouter.get("/orders", (req, res) => {
  res.send("주문결제 페이지");
});

// 주문완료 페이지
rootRouter.get("/orders/end", (req, res) => {
  res.send("주문완료 페이지");
});

export default rootRouter;
