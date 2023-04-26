import express from "express";
import morgan from "morgan";
import path from "path";
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.static(__dirname)); // 이미지 경로 고정
app.use(express.static(__dirname + "/views")); // 화면 경로 고정

app.use("/users", userRouter); // 사용자(개인) 페이지 관련 라우터
app.use("/admins", adminRouter); // 관리자 페이지 관련 라우터

app.use("/", (req, res) => {
  res.sendFile("main.html", {
    root: path.join(__dirname, "views/main"),
  });
});

export default app;
