import "dotenv/config"; // 환경변수 사용
import app from "./app";

const PORT = process.env.PORT || 3000;

const handleListening = () => {
  console.log(`✅ Server listening on port ${PORT}`);
};

app.listen(PORT, handleListening);
