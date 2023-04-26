import express from "express";
import morgan from "morgan";
// 라우터
import userRouter from "./routes/userRouter";
import adminRouter from "./routes/adminRouter";
import rootRouter from "./routes/rootRouter";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(express.static(__dirname)); // 이미지 경로 고정
app.use(express.static(__dirname + "/views")); // 화면 경로 고정

app.use("/users", userRouter); // 사용자(개인) 페이지 관련 라우터
app.use("/admins", adminRouter); // 사용자(개인) 페이지 관련 라우터
app.use("/", rootRouter);

export default app;
