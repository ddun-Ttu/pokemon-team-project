import express from "express";

const adminRouter = express.Router();

// const PATH_NAME = __dirname.split("/").slice(0, -1).join("/");

// 관리자 페이지
adminRouter.get("/", (req, res) => {
  res.send("관리자 페이지");
});

// 등록된 포켓몬(상품) 목록 조회 및 관리 페이지
adminRouter.get("/pokemons", (req, res) => {
  res.send("등록된 포켓몬(상품) 목록 조회 및 관리 페이지");
});

// 새 포켓몬(상품) 추가 페이지
adminRouter.get("/pokemons/add", (req, res) => {
  res.send("새 포켓몬(상품) 추가 페이지");
});

// 선택한 포켓몬(상품) 내용 수정 페이지
adminRouter.get("/pokemons/:pokemonId/edit", (req, res) => {
  res.send("선택한 포켓몬(상품) 내용 수정 페이지");
});

// 등록된 주문 목록 조회 및 관리 페이지
adminRouter.get("/orders", (req, res) => {
  res.send("등록된 주문 목록 조회 및 관리 페이지");
});

// 카테고리 목록 조회 및 관리 페이지
adminRouter.get("/categories", (req, res) => {
  res.send("카테고리 목록 조회 및 관리 페이지");
});

// 카테고리 추가 페이지
adminRouter.get("/categories/add", (req, res) => {
  res.send("카테고리 추가 페이지");
});

// 카테고리 수정 페이지
adminRouter.get("/categories/:categoryId/edit", (req, res) => {
  res.send("카테고리 수정 페이지");
});

export default adminRouter;
