import express from "express";

const PATH_NAME = __dirname.split("/").slice(0, -1).join("/");

const adminRouter = express.Router();

// 관리자 페이지
adminRouter.get("/", (req, res) => {
  const PAGE_NAME = "adminsPage";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 등록된 포켓몬(상품) 목록 조회 및 관리 페이지
adminRouter.get("/pokemons", (req, res) => {
  const PAGE_NAME = "adminsProduct";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 새 포켓몬(상품) 추가 페이지
adminRouter.get("/pokemons/add", (req, res) => {
  const PAGE_NAME = "productRegistration";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 선택한 포켓몬(상품) 내용 수정 페이지
adminRouter.get("/pokemons/:pokemonId/edit", (req, res) => {
  const PAGE_NAME = "adminsProductEdit";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 등록된 주문 목록 조회 및 관리 페이지
adminRouter.get("/orders", (req, res) => {
  const PAGE_NAME = "adminsOrders";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 카테고리 목록 조회 및 관리 페이지
adminRouter.get("/categories", (req, res) => {
  const PAGE_NAME = "adminsCategory";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 카테고리 추가 페이지
adminRouter.get("/categories/add", (req, res) => {
  const PAGE_NAME = "adminsCategoryAdd";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

// 카테고리 수정 페이지
adminRouter.get("/categories/:categoryId/edit", (req, res) => {
  const PAGE_NAME = "adminsEditCategory";

  res.sendFile(`${PATH_NAME}/views/${PAGE_NAME}.html`);
});

export default adminRouter;
