import express from "express";

const userRouter = express.Router();

// const PATH_NAME = __dirname.split("/").slice(0, -1).join("/");

// 회원가입 페이지
userRouter.get("/signup", (req, res) => {
  res.send("회원가입 페이지");
});

// 로그인 페이지
userRouter.get("/login", (req, res) => {
  res.send("로그인 페이지");
});

// 개인 페이지
userRouter.get("/mypage", (req, res) => {
  res.send("개인 페이지");
});

// 사용자 확인 페이지
userRouter.get("/mypage/confirm", (req, res) => {
  res.send("사용자 확인 페이지");
});

// 사용자 정보 수정 페이지
userRouter.get("/mypage/edit", (req, res) => {
  res.send("사용자 정보 수정 페이지");
});

// 사용자 주문 목록 조회 페이지
userRouter.get("/mypage/orders", (req, res) => {
  res.send("사용자 주문 목록 조회 페이지");
});

// 사용자 주문 수정 페이지
userRouter.get("/mypage/orders/:orderId/edit", (req, res) => {
  res.send("사용자 주문 수정 페이지");
});

export default userRouter;
