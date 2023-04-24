import express from "express";
import path from "path";

const userRouter = express.Router();

const PATH_NAME = __dirname.split("/").slice(0, -1).join("/");

// 사용자 가입 페이지, Read
userRouter.get("/signup", (req, res) => {
  const PAGE_NAME = "sign-up";

  res.sendFile(`${PAGE_NAME}.html`, {
    root: path.join(PATH_NAME, `views/${PAGE_NAME}`),
  });
});

// 사용자 로그인 페이지, Read
userRouter.get("/login", (req, res) => {
  const PAGE_NAME = "login";

  res.sendFile(`${PAGE_NAME}.html`, {
    root: path.join(PATH_NAME, `views/${PAGE_NAME}`),
  });
});

// 사용자 페이지, Read
userRouter.get("/mypage", (req, res) => {
  const PAGE_NAME = "mypage";

  res.sendFile(`${PAGE_NAME}.html`, {
    root: path.join(PATH_NAME, `views/${PAGE_NAME}`),
  });
});

// 사용자 정보 관리 페이지, Read
userRouter.get("/mypage/edit", (req, res) => {
  const PAGE_NAME = "user-account";

  res.sendFile(`${PAGE_NAME}.html`, {
    root: path.join(PATH_NAME, `views/${PAGE_NAME}`),
  });
});

// 사용자 주문 목록 페이지, Read
userRouter.get("/mypage/orders", (req, res) => {
  const PAGE_NAME = "my-orders";

  res.sendFile(`${PAGE_NAME}.html`, {
    root: path.join(PATH_NAME, `views/${PAGE_NAME}`),
  });
});

// 사용자 주문 수정 페이지, Read
userRouter.get("/mypage/orders/:orderid/edit", (req, res) => {
  const { orderid } = req.params;

  res.send(`주문번호: [${orderid}]의 주문 수정 페이지입니다.`);
});

export default userRouter;
